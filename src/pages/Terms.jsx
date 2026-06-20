import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Terms() {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <>
      <SEO 
        title={isAr ? 'شروط الاستخدام' : 'Terms of Service'} 
        description={isAr ? 'قراءة شروط الاستخدام والخدمة لوكالة أثر.' : 'Read the terms of service and conditions for Ather Agency.'}
        path="/terms"
      />
      
      <div className="pt-32 pb-20 min-h-screen bg-gray-950 text-gray-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {isAr ? 'شروط الاستخدام' : 'Terms of Service'}
            </h1>
            <p className="text-gray-400">
              {isAr ? 'آخر تحديث: أبريل ٢٠٢٦' : 'Last Updated: April 2026'}
            </p>
          </div>

          <div className={`space-y-10 prose prose-invert max-w-none ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">١. قبول الشروط</h2>
                  <p>
                    من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بشروط وأحكام الاستخدام هذه، وجميع القوانين واللوائح المعمول بها، وتوافق على أنك مسؤول عن الامتثال لأي قوانين محلية معمول بها.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٢. تقديم الخدمات</h2>
                  <p>
                    تقدم وكالة أثر خدمات التسويق الرقمي وتصميم المواقع بناءً على اتفاقيات وشروط يتم التفاوض عليها بشكل فردي لكل من عملائنا قبل بدء المشاريع. محتوى هذا الموقع مخصص لأغراض المعلومات العامة فقط.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٣. المدفوعات والسياسات المالية</h2>
                  <p>
                    يتم تحديد الجداول الزمنية للدفع ومراحل التسليم وأي سياسات استرداد في العقود المنفصلة مع العملاء. أسعار الباقات المعروضة على الموقع هي أسعار تقديرية وقد تتغير بناءً على متطلبات المشروع المحددة.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٤. حقوق الملكية الفكرية</h2>
                  <p>
                    جميع المحتويات المدرجة في هذا الموقع، مثل النصوص والرسومات والشعارات وأيقونات الأزرار والصور والمقاطع الصوتية، هي ملك لوكالة أثر أو موردي محتواها ومحمية بموجب قوانين حقوق الطبع والنشر الدولية.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٥. تحديد المسؤولية</h2>
                  <p>
                    لن تكون وكالة أثر بأي حال من الأحوال مسؤولة عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام الخدمات والمواد الموجودة على موقعنا.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Provision of Services</h2>
                  <p>
                    Ather Agency provides digital marketing and web development services based on individually negotiated agreements and terms with each of our clients before projects begin. The content of this website is intended for general information purposes only.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Payments and Financial Policies</h2>
                  <p>
                    Payment schedules, delivery milestones, and any refund policies are outlined in separate contracts with clients. Package prices displayed on the website are estimates and may change based on specific project requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                  <p>
                    All content included on this site, such as text, graphics, logos, button icons, images, and audio clips, is the property of Ather Agency or its content suppliers and protected by international copyright laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                  <p>
                    In no event shall Ather Agency be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website or our services.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
