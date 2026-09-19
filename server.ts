import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Helper for lazy GenAI initialization
  function getGeminiAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'MUEENI AI' });
  });

  // AI Assistant Chat endpoint
  app.post('/api/assistant', async (req, res) => {
    const { message, history, lang } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const isEnglish = lang === 'en' || /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(message.trim());

    try {
      const ai = getGeminiAI();

      if (ai) {
        const systemInstruction = isEnglish
          ? `You are the "Smart Advisor" in the "MUEENI AI" platform - Saudi Arabia's national smart platform for services, rights, and empowerment of persons with disabilities (with special focus on mobility and all accessibility needs).
Response guidelines:
1. Provide clear, encouraging, accurate, and professional answers in English.
2. Always specify the relevant "Responsible Entity" (e.g., Authority of People with Disabilities APD, Ministry of Human Resources and Social Development, Transport General Authority TGA, Municipality / Traffic Department, Ministry of Health / Sehhaty).
3. Clearly explain beneficiary entitlements and steps to apply in an organized manner.
4. Mention relevant benefits: 50% transit discount, traffic facilitation pass, Nitaqat 4x employment weighting, Purple Saturday initiative, or reporting barriers via "Voice Heard".
5. Format with concise bullet points for accessibility.`
          : `أنت "المستشار الذكي" في منصة "مُعِيني AI" (MUEENI AI) - المنصة الوطنية الذكية لخدمات وحقوق وتمكين الأشخاص ذوي الإعاقة في المملكة العربية السعودية (بتركيز خاص على الإعاقة الحركية وكافة الإعاقات).
قواعد تقديم الإجابة:
1. قدم إجابات واضحة، دقيقة، مشجعة، ومهنية باللغة العربية.
2. وضح دائماً "الجهة المسؤولة" ذات العلاقة (مثل: هيئة رعاية الأشخاص ذوي الإعاقة APD، وزارة الموارد البشرية والتنمية الاجتماعية، الهيئة العامة للنقل، أمانة المنطقة / المرور، وزارة الصحة / منصة صحتي).
3. بين حقوق المستفيد وطريقة التقديم أو الاستفادة بأسلوب سهل ومنظم.
4. اذكر المزايا ذات الصلة مثل: تخفيض إركاب 50%، بطاقة التسهيلات المرورية، احتساب الموظف بـ 4 في نطاقات، مبادرة السبت البنفسجي، أو رفع البلاغات عبر خدمة "صوتك مسموع".
5. نسق الرد بنقاط واضحة ومختصرة لتسهيل القراءة لذوي الإعاقة.`;

        const chatContents = (history || []).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        }));

        chatContents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: chatContents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const replyText = response.text || (isEnglish ? 'Thank you for contacting MUEENI. We are always glad to assist you.' : 'شكراً لتواصلك مع مُعِيني. يسعدنا دائماً خدمتك.');

        // Identify responsible entity mention if any
        let entity = isEnglish
          ? {
              name: 'Authority of People with Disabilities (APD)',
              role: 'National entity regulating unified rights and comprehensive services',
            }
          : {
              name: 'هيئة رعاية الأشخاص ذوي الإعاقة (APD)',
              role: 'الجهة الوطنية المنظمة للحقوق والخدمات الشاملة',
            };

        const lower = (replyText + ' ' + message).toLowerCase();
        if (lower.includes('نقل') || lower.includes('إركاب') || lower.includes('قطار') || lower.includes('طيران') || lower.includes('حافلات') || lower.includes('transit') || lower.includes('flight') || lower.includes('train') || lower.includes('bus')) {
          entity = isEnglish
            ? {
                name: 'Transport General Authority (TGA)',
                role: 'Regulating public transport policies and travel fare discounts',
              }
            : {
                name: 'الهيئة العامة للنقل (TGA)',
                role: 'تنظيم خدمات وتخفيضات النقل العام وتذاكر السفر',
              };
        } else if (lower.includes('موقف') || lower.includes('مرور') || lower.includes('رصيف') || lower.includes('أمانة') || lower.includes('بلاغ') || lower.includes('parking') || lower.includes('traffic') || lower.includes('barrier') || lower.includes('sidewalk')) {
          entity = isEnglish
            ? {
                name: 'Municipality & General Directorate of Traffic',
                role: 'Regulating reserved parking and eliminating municipal barriers',
              }
            : {
                name: 'أمانة منطقة الرياض & الإدارة العامة للمرور',
                role: 'تنظيم المواقف المخصصة وإزالة العوائق البلدية',
              };
        } else if (lower.includes('وظيفة') || lower.includes('عمل') || lower.includes('تدريب') || lower.includes('نطاقات') || lower.includes('تأهيل') || lower.includes('job') || lower.includes('career') || lower.includes('work') || lower.includes('training') || lower.includes('nitaqat')) {
          entity = isEnglish
            ? {
                name: 'Ministry of Human Resources & Social Development',
                role: 'Empowerment, inclusive employment, and Mowaamah programs',
              }
            : {
                name: 'وزارة الموارد البشرية والتنمية الاجتماعية',
                role: 'برامج التمكين والتوظيف والتأهيل الشامل',
              };
        } else if (lower.includes('طبي') || lower.includes('موعد') || lower.includes('تقرير') || lower.includes('صحتي') || lower.includes('مستشفى') || lower.includes('health') || lower.includes('medical') || lower.includes('clinic') || lower.includes('sehhaty')) {
          entity = isEnglish
            ? {
                name: 'Ministry of Health (Sehhaty Platform)',
                role: 'Medical reports and assistive device approvals',
              }
            : {
                name: 'وزارة الصحة (منصة صحتي)',
                role: 'التقارير الطبية وإصدار قرارات الأجهزة التعويضية',
              };
        }

        res.json({
          reply: replyText,
          responsibleEntity: entity,
          isAI: true,
        });
        return;
      }
    } catch {
      // Fallback
    }

    // Comprehensive National Accessibility Knowledge Engine
    const msg = message.toLowerCase();
    let fallbackReply = isEnglish
      ? 'Welcome to MUEENI platform. You can access government entitlements, accessible careers, and digital pass services across our unified portal.'
      : 'أهلاً بك في منصة مُعِيني. يمكنك الاستفادة من مختلف الخدمات الحكومية والتسهيلات الرقمية المتاحة للأشخاص ذوي الإعاقة عبر بوابتنا الموحدة.';

    let entity = isEnglish
      ? {
          name: 'Authority of People with Disabilities (APD)',
          role: 'National unified legislation and accessibility policies',
        }
      : {
          name: 'هيئة رعاية الأشخاص ذوي الإعاقة (APD)',
          role: 'التشريعات والسياسات الوطنية الموحدة',
        };

    if (msg.includes('تسهيلات') || msg.includes('موقف') || msg.includes('سيارة') || msg.includes('مرور') || msg.includes('مواقف') || msg.includes('parking') || msg.includes('traffic') || msg.includes('pass')) {
      fallbackReply = isEnglish
        ? `MUEENI enables you to access all accredited traffic facilitation privileges:
• **Accessible Parking Pass**: Issued and renewed instantly via direct link with APD and the Traffic Directorate.
• **Privileges**: Free parking in all public and equipped private parking spaces, plus priority lane clearance.
• **Digital Renewal**: View and export your QR-verified pass directly in the "Digital Wallet" tab.`
        : `تتيح لك منصة "مُعِيني" الاستفادة من كافة التسهيلات المرورية المعتمدة:
• **بطاقة التسهيلات المرورية**: تصدر وتجدد فورياً بربط مباشر مع هيئة رعاية ذوي الإعاقة والإدارة العامة للمرور.
• **المزايا**: الوقوف المجاني في كافة المواقف العامة والخاصة المجهزة، وتصريح عبور المسارات الخاصة.
• **التجديد الرقمي**: يمكنك استعراض وتحميل بطاقتك برمز QR موثق عبر تبويب "المحفظة الرقمية".`;
      entity = isEnglish
        ? {
            name: 'Authority of People with Disabilities & Traffic Police',
            role: 'Traffic pass issuance and parking enforcement',
          }
        : {
            name: 'هيئة رعاية الأشخاص ذوي الإعاقة & المرور',
            role: 'إصدار التراخيص المرورية والمواقف المخصصة',
          };
    } else if (msg.includes('إركاب') || msg.includes('تذكرة') || msg.includes('سفر') || msg.includes('طيران') || msg.includes('قطار') || msg.includes('نقل') || msg.includes('حافلات') || msg.includes('transit') || msg.includes('flight') || msg.includes('ticket') || msg.includes('travel') || msg.includes('bus')) {
      fallbackReply = isEnglish
        ? `Public Transportation Rights & Fare Discounts for Persons with Disabilities:
• **50% Fare Discount**: Valid across rail networks (SAR, Haramain High Speed Rail), intercity buses, and domestic flights via Saudia and flynas.
• **Companion Discount**: Certified companion receives an equal 50% discount.
• **Transit Warrants**: View your allocated government travel warrants in the "Digital Wallet" tab.`
        : `حقوق وتخفيضات النقل العام للأشخاص ذوي الإعاقة:
• **تخفيض 50%**: يشمل تذاكر السفر بالقطارات (سار، قطار الحرمين)، الحافلات، والرحلات الجوية الداخلية عبر الخطوط السعودية وطيران ناس.
• **تخفيض المرافق**: يشمل الخصم تذكرة المرافق المعتمد بنفس النسبة (50%).
• **أوامر الإركاب**: يمكنك استعراض أوامر الإركاب الحكومية السنوية المخصصة لك في "المحفظة الرقمية".`;
      entity = isEnglish
        ? {
            name: 'Transport General Authority (TGA)',
            role: 'Regulating public transport policies and travel fare discounts',
          }
        : {
            name: 'الهيئة العامة للنقل (TGA)',
            role: 'تنظيم سياسات وتخفيضات النقل العام',
          };
    } else if (msg.includes('وظيفة') || msg.includes('عمل') || msg.includes('توظيف') || msg.includes('تدريب') || msg.includes('نطاقات') || msg.includes('مواءمة') || msg.includes('job') || msg.includes('career') || msg.includes('work') || msg.includes('training') || msg.includes('nitaqat')) {
      fallbackReply = isEnglish
        ? `Empowerment & Accessible Employment Programs:
• **MUEENI Empowerment Portal**: Browse verified accessible vacancies and co-op programs at leading enterprises (STC, Elm, Al Rajhi, Aramco).
• **Logistics Readiness Matrix**: Audit workplace accessibility (ramps, elevators, assistive software, ergonomic stations).
• **Nitaqat Incentive**: Hiring an employee with a disability counts as 4 points in enterprise Saudization quotas.`
        : `برامج التمكين والتوظيف الميسر:
• **بوابة التمكين في مُعِيني**: توفر شواغر وبرامج تدريب تعاوني مواءمة لدى كبرى الشركات (STC، علم، الراجحي، أرامكو).
• **مصفوفة التهيئة اللوجستية**: فحص جاهزية بيئة العمل (منحدرات، مصاعد، تكنولوجيا مساعدة، مكاتب ذكية).
• **برنامج نطاقات**: يحسب توظيف الموظف ذي الإعاقة بـ 4 نقاط في نسبة التوطين للمنشأة لتحفيز بيئات العمل الشاملة.`;
      entity = isEnglish
        ? {
            name: 'Ministry of Human Resources & Social Development',
            role: 'Mowaamah inclusive workplace and employment empowerment',
          }
        : {
            name: 'وزارة الموارد البشرية والتنمية الاجتماعية',
            role: 'برنامج مواءمة وتمكين ذوي الإعاقة في سوق العمل',
          };
    } else if (msg.includes('حقوق') || msg.includes('نظام العمل') || msg.includes('ساعات') || msg.includes('قانون') || msg.includes('rights') || msg.includes('law')) {
      fallbackReply = isEnglish
        ? `Key Protections Under the Law of Rights of Persons with Disabilities:
• **Accessible Work Environment**: Employers must provide suitable assistive equipment and accessible facilities.
• **Flexible Working Hours**: Right to adjusted working hours or remote work according to medical recommendations.
• **Non-Discrimination**: Strict prohibition of discrimination in hiring, promotions, or compensation.`
        : `أبرز الحقوق المكفولة بنظام حقوق الأشخاص ذوي الإعاقة:
• **بيئة العمل الميسرة**: إلزام المنشآت بتوفير التجهيزات التقنية والأجهزة المساعدة المناسبة.
• **ساعات عمل مرنة**: الحق في تعديل ساعات العمل أو العمل عن بعد وفق ما تقتضيه الحالة.
• **عدم التمييز**: حظر أي تمييز في التعيين، الترقية، أو الأجور، مع توفير مسارات ترقي متكافئة.`;
      entity = isEnglish
        ? {
            name: 'Authority of People with Disabilities (APD)',
            role: 'Monitoring and safeguarding disability rights across Saudi Arabia',
          }
        : {
            name: 'هيئة رعاية الأشخاص ذوي الإعاقة',
            role: 'رصد وضمان حقوق ذوي الإعاقة بالمملكة',
          };
    } else if (msg.includes('موعد') || msg.includes('طب') || msg.includes('تقرير') || msg.includes('مستشفى') || msg.includes('صحتي') || msg.includes('أجهزة') || msg.includes('clinic') || msg.includes('hospital') || msg.includes('appointment')) {
      fallbackReply = isEnglish
        ? `Healthcare & Rehabilitation Services:
• **Smart Reminders**: Track rehabilitation sessions and medical reviews at medical cities.
• **Digital Medical Reports**: Access certified reports issued via Sehhaty and confirm assistive device disbursements.
• **Proactive Alerts**: Receive notifications 48 hours prior to arrange accessible transport.`
        : `الخدمات الصحية والتأهيلية:
• **المنبه الذكي**: يتيح لك متابعة مواعيد جلسات التأهيل الطبي والفحوصات في المدن الطبية.
• **التقارير الطبية الرقمية**: استعراض التقارير الطبية المعتمدة الصادرة عبر منصة صحتي وتأكيد قرارات صرف الأجهزة التعويضية.
• **تذكير استباقي**: إرسال تنبيهات قبل الموعد بـ 48 ساعة لتنسيق النقل والمرافقة.`;
      entity = isEnglish
        ? {
            name: 'Ministry of Health (Sehhaty)',
            role: 'Rehabilitation care and verified medical records',
          }
        : {
            name: 'وزارة الصحة (منصة صحتي)',
            role: 'الرعاية التأهيلية والتقارير الطبية المعتمدة',
          };
    } else if (msg.includes('بلاغ') || msg.includes('صوتك مسموع') || msg.includes('مخالفة') || msg.includes('رصيف') || msg.includes('حفرة') || msg.includes('عائق') || msg.includes('report') || msg.includes('barrier')) {
      fallbackReply = isEnglish
        ? `"Voice Heard" Accessibility Barrier Reporting Service:
• **Instant Submissions**: Capture photo evidence and GPS coordinates of sidewalk obstacles or parking encroachments.
• **Direct Dispatch**: The report is instantly forwarded to Riyadh Municipality and Traffic Police.
• **Live Tracking**: Follow resolution stages (Received, In Review, Dispatched, Resolved) in "Smart Reports".`
        : `خدمة "صوتك مسموع" للرصد الميداني:
• **رفع البلاغات الفورية**: يمكنك التقاط صورة وتحديد إحداثيات GPS لعوائق الأرصفة أو التعدي على المواقف المخصصة.
• **الإحالة المباشرة**: يحال البلاغ فورياً إلى أمانة المنطقة والإدارة العامة للمرور لمباشرة الموقع.
• **التتبع اللحظي**: متابعة مراحل المعالجة (استلام، مراجعة، إحالة، اكتمال) عبر تبويب "صوتك مسموع".`;
      entity = isEnglish
        ? {
            name: 'Municipality & Traffic Police',
            role: 'Direct barrier remediation and code enforcement',
          }
        : {
            name: 'أمانة منطقة الرياض & المرور',
            role: 'مباشرة البلاغات الميدانية وإزالة عوائق الوصول',
          };
    } else if (msg.includes('سبت') || msg.includes('بنفسجي') || msg.includes('عرض') || msg.includes('خصم') || msg.includes('تخفيض') || msg.includes('purple') || msg.includes('offer') || msg.includes('discount')) {
      fallbackReply = isEnglish
        ? `Purple Saturday Initiative & Exclusive Commercial Perks:
• **Purple Saturday**: A national initiative with 500+ participating brands providing exclusive discounts up to 70%.
• **Year-Round Perks**: Discounts across hotels, cafes, wellness centers, and retail stores via your MUEENI pass.
• **Redemption**: Activate promo codes and instant barcodes in the "Services & Discounts" tab.`
        : `مبادرة السبت البنفسجي والعروض الحصرية:
• **السبت البنفسجي**: مبادرة وطنية تشارك فيها أكثر من 500 منشأة بخصومات استثنائية تصل إلى 70%.
• **عروض دائمة**: خصومات في قطاعات الفنادق، المقاهي، الأندية الصحية، ومتاجر التجزئة عبر بطاقتك في مُعِيني.
• **الاستفادة**: يمكنك استعراض وتفعيل أكواد الخصم فورياً عبر تبويب "العروض والخصومات".`;
      entity = isEnglish
        ? {
            name: 'Seasonal Participation & Community Center',
            role: 'Purple Saturday campaign coordination',
          }
        : {
            name: 'مركز المشاركة والتمكين الموسمي',
            role: 'تنسيق مبادرات وعروض السبت البنفسجي',
          };
    }

    res.json({
      reply: fallbackReply,
      responsibleEntity: entity,
      isAI: false,
    });
  });

  // AI Accessibility Barrier Analyzer
  app.post('/api/analyze-report', async (req, res) => {
    const { description, lang } = req.body;
    const isEnglish = lang === 'en' || /^[a-zA-Z0-9\s.,!?'"()-]+$/.test((description || '').trim());

    try {
      const ai = getGeminiAI();
      if (ai && description) {
        const prompt = isEnglish
          ? `Analyze the following accessibility barrier report description and identify: (1. Appropriate Category, 2. Priority Level, 3. Responsible Saudi Government Entity, 4. Proposed Remediation Action): "${description}"`
          : `حلل وصف البلاغ التالي وحدد (الفئة المناسبة، مدى الأولوية، الجهة الحكومية المختصة، وإجراء المعالجة المقترح): "${description}"`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
        });
        res.json({ analysis: response.text });
        return;
      }
    } catch {
      // In case of API issue, fall back to rule-based classification
    }

    const d = (description || '').toLowerCase();
    let analysis = isEnglish
      ? 'The report is categorized as High Priority and will be dispatched directly to the responsible authority for rapid remediation.'
      : 'تم تصنيف البلاغ كأولوية عالية وسيتم توجيهه مباشرة للجهة المختصة لمباشرة الموقع.';

    if (d.includes('موقف') || d.includes('سيارة') || d.includes('وقوف') || d.includes('parking') || d.includes('car')) {
      analysis = isEnglish
        ? 'Classification: Encroachment on accessible parking (Critical Priority) - Entity: General Directorate of Traffic - Action: Dispatching field patrol for ticketing and towing.'
        : 'التصنيف: تعدٍ على مواقف ذوي الإعاقة (أولوية قصوى) - الجهة: الإدارة العامة للمرور - الإجراء: توجيه دورية الميدان لتحرير مخالفة وسحب المركبة.';
    } else if (d.includes('رصيف') || d.includes('منحدر') || d.includes('حفرة') || d.includes('شارع') || d.includes('sidewalk') || d.includes('ramp') || d.includes('curb')) {
      analysis = isEnglish
        ? 'Classification: Urban walkway obstacle or absent ramp (Urgent Priority) - Entity: Riyadh Municipality / Road Maintenance - Action: Directing maintenance crew to level and install compliant ramp.'
        : 'التصنيف: عائق في المشهد الحضري وممر المشاة (أولوية عاجلة) - الجهة: أمانة المنطقة / صيانة الطرق - الإجراء: تعميد فرقة الصيانة لتسوية المنحدر.';
    } else if (d.includes('مصعد') || d.includes('مبنى') || d.includes('مدخل') || d.includes('باب') || d.includes('elevator') || d.includes('entrance')) {
      analysis = isEnglish
        ? 'Classification: Non-compliant facility entrance or broken elevator (Urgent Priority) - Entity: Balady & APD - Action: Notifying establishment to comply with Saudi Building Code accessibility standards.'
        : 'التصنيف: عدم تهيئة مداخل ومصاعد المنشأة (أولوية عاجلة) - الجهة: بلدي & هيئة APD - الإجراء: إشعار المنشأة بالالتزام بكود البناء السعودي.';
    }

    res.json({ analysis });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MUEENI AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
