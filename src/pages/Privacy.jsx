import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Privacy() {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <>
      <SEO 
        title={isAr ? 'سياسة الخصوصية' : 'Privacy Policy'} 
        description={isAr ? 'تعرف على سياسة الخصوصية الخاصة بوكالة أثر وكيف نحمي بياناتك.' : 'Learn about Ather Agency\'s privacy policy and how we protect your data.'}
        path="/privacy"
      />
      
      <div className="pt-32 pb-20 min-h-screen bg-gray-950 text-gray-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-400">
              {isAr ? 'آخر تحديث: أبريل ٢٠٢٦' : 'Last Updated: April 2026'}
            </p>
          </div>

          <div className={`space-y-10 prose prose-invert max-w-none ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">١. مقدمة</h2>
                  <p>
                    في وكالة أثر (Ather Agency)، نحن نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيف نقوم بجمع واستخدام وحماية أي معلومات تقدمها لنا عند استخدام هذا الموقع أو خدماتنا.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٢. المعلومات التي نجمعها</h2>
                  <p>قد نقوم بجمع المعلومات التالية عندما تتواصل معنا أو تستخدم خدماتنا:</p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>الاسم والمسمى الوظيفي.</li>
                    <li>معلومات الاتصال بما في ذلك عنوان البريد الإلكتروني ورقم الهاتف.</li>
                    <li>المعلومات الديموغرافية ومجال عملك.</li>
                    <li>معلومات أخرى ذات صلة باستطلاعات العملاء أو العروض.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٣. كيف نستخدم معلوماتك</h2>
                  <p>نحن نطلب هذه المعلومات لفهم احتياجاتك وتقديم خدمة أفضل، وعلى وجه الخصوص للأسباب التالية:</p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>حفظ السجلات الداخلية.</li>
                    <li>تحسين منتجاتنا وخدماتنا.</li>
                    <li>إرسال رسائل بريد إلكتروني ترويجية دورية حول الخدمات الجديدة أو العروض الخاصة العروض.</li>
                    <li>من وقت لآخر، قد نستخدم معلوماتك للاتصال بك لأغراض أبحاث السوق.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٤. الأمان</h2>
                  <p>
                    نحن ملتزمون بضمان أن معلوماتك آمنة. من أجل منع الوصول غير المصرح به أو الكشف عنها، قمنا بوضع إجراءات مادية وإلكترونية وإدارية مناسبة لحماية وتأمين المعلومات التي نجمعها عبر الإنترنت.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">٥. تواصل معنا</h2>
                  <p>
                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:
                    <br />البريد الإلكتروني: <a href="mailto:atheragancy@gmail.com" className="text-blue-400 hover:underline">atheragancy@gmail.com</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                  <p>
                    At Ather Agency, we take your privacy seriously. This privacy policy sets out how we use and protect any information that you give us when you use this website or our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                  <p>We may collect the following information when you contact us or use our services:</p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>Name and job title.</li>
                    <li>Contact information including email address and phone number.</li>
                    <li>Demographic information and business industry.</li>
                    <li>Other information relevant to customer surveys or offers.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                  <p>We require this information to understand your needs and provide you with a better service, particularly for the following reasons:</p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>Internal record keeping.</li>
                    <li>To improve our products and services.</li>
                    <li>To periodically send promotional emails about new services, special offers, or other information.</li>
                    <li>From time to time, we may also use your information to contact you for market research purposes.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Security</h2>
                  <p>
                    We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                  <p>
                    If you have any questions about this privacy policy, please contact us at:
                    <br />Email: <a href="mailto:atheragancy@gmail.com" className="text-blue-400 hover:underline">atheragancy@gmail.com</a>
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
