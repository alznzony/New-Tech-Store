import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* القسم التقديمي */}
      <section className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6">
          من نحن في نيو تك
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          نيو تك ليست مجرد متجر إلكتروني، بل هي وجهة تقنية شاملة تدمج بين{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            الجودة
          </span>{" "}
          و{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            الثقة
          </span>{" "}
          و{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            الابتكار
          </span>
          ، لتصنع تجربة تسوق استثنائية تليق بكم.
        </p>
      </section>

      {/* رحلة التأسيس */}
      <section className="mb-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              قصة بدأت بإيمان
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              في عام 2025 انطلقنا برؤية واضحة: تقديم تجربة تقنية مختلفة في السوق
              السوداني، حيث الجودة لا تقبل المساومة، والخدمة ليست مجرد شعار.
            </p>
            <div className="space-y-4">
              {[
                "أول متجر يقدم ضمانًا حقيقيًا على جميع المنتجات",
                "فريق تقني متخصص لاختيار كل منتج بعناية",
                "شبكة توصيل تغطي جميع أنحاء بورتسودان وقريبا جميع انحا السودان",
                "دعم فني متاح 12 ساعة يوميًا",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/img/logo.jpg"
              alt="قصة نيو تك"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* إحصائيات وأرقام */}
      <section className="mb-20 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
          نيو تك في أرقام
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <ShoppingBag size={32} className="text-blue-600" />,
              value: "100+",
              label: "منتج تقني",
            },
            {
              icon: <Clock size={32} className="text-green-600" />,
              value: "24h",
              label: "توصيل سريع",
            },
            {
              icon: <ShieldCheck size={32} className="text-amber-600" />,
              value: "100%",
              label: "منتجات أصلية",
            },
            {
              icon: <Headphones size={32} className="text-purple-600" />,
              value: "12h",
              label: "دعم يومي",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* القيم الأساسية */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
          رؤيتنا وأسلوب عملنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Globe size={40} className="text-blue-600 mb-4" />,
              title: "رؤيتنا",
              content:
                "أن نكون الوجهة التقنية الأولى في السودان من خلال تقديم منتجات مبتكرة وخدمات استثنائية تواكب أحدث التطورات العالمية.",
            },
            {
              icon: <Award size={40} className="text-amber-600 mb-4" />,
              title: "رسالتنا",
              content:
                "تمكين المجتمع من الوصول إلى أفضل التقنيات بأسعار تنافسية، مع الحفاظ على أعلى معايير الجودة والموثوقية.",
            },
            {
              icon: <ShieldCheck size={40} className="text-green-600 mb-4" />,
              title: "جودة لا تقبل المساومة",
              content:
                "كل منتج في نيو تك يخضع لفحص دقيق من فريقنا الفني لضمان مطابقته للمواصفات وأصليته قبل وصوله إليك.",
            },
            {
              icon: <Truck size={40} className="text-red-600 mb-4" />,
              title: "التزام نحو العميل",
              content:
                "نعتبر كل عميل شريكًا في رحلتنا، ونعمل يوميًا على تحسين خدماتنا لتلبية توقعاتكم وتجاوزها.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* دعوة للعمل */}
      <section className="bg-blue-900 text-white rounded-2xl p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">نحن هنا من أجلك</h2>
          <p className="text-xl mb-8">
            سواء كنت بحاجة إلى استشارة تقنية أو مساعدة في اختيار المنتج المناسب،
            فريقنا متاح لخدمتك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* زر واتساب */}
            <a
              href="https://wa.me/249916424528"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              تواصل معنا
            </a>

            {/* زر تصفح المنتجات */}
            <Link
              to="/all-products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              تصفح منتجاتنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
