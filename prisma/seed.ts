import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  // Wipe existing data
  await prisma.message.deleteMany();
  await prisma.media.deleteMany();
  await prisma.article.deleteMany();
  await prisma.project.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const editorPassword = await bcrypt.hash("editor123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "editor@example.com",
      name: "Editor User",
      password: editorPassword,
      role: "EDITOR",
    },
  });

  // Settings
  const settings = [
    { key: "siteName", value: "Lumen" },
    { key: "siteDescription", value: "A next-gen digital studio shipping 3D, motion, and AI-powered products for ambitious brands." },
    { key: "contactEmail", value: "hello@lumen.studio" },
    { key: "socialTwitter", value: "https://twitter.com/lumen" },
    { key: "socialLinkedIn", value: "https://linkedin.com/company/lumen" },
    { key: "socialGitHub", value: "https://github.com/lumen" },
  ];
  for (const s of settings) {
    await prisma.setting.create({ data: s });
  }

  // Projects
  const projects = [
    {
      slug: "northwind-product-page",
      titleEn: "Northwind Product Page",
      titleAr: "صفحة منتج Northwind",
      descriptionEn: "A high-converting product launch page with 3D product viewer, GSAP scroll narrative, and edge-rendered streaming. Doubled time-on-page and increased checkout conversion by 38%.",
      descriptionAr: "صفحة إطلاق منتج عالية التحويل مع عارض منتج ثلاثي الأبعاد، سرد GSAP، وبث على الـ edge. ضاعفت وقت البقاء على الصفحة وزادت التحويل للدفع بنسبة 38%.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop",
      category: "Web",
      technologies: "Next.js,Three.js,GSAP,Tailwind,Stripe",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
      order: 1,
    },
    {
      slug: "aperture-dashboard",
      titleEn: "Aperture Analytics Dashboard",
      titleAr: "لوحة تحليلات Aperture",
      descriptionEn: "A real-time analytics dashboard for a Series B SaaS. Handles 2B events/day with sub-second queries, custom visualizations, and AI-powered anomaly detection.",
      descriptionAr: "لوحة تحليلات في الوقت الفعلي لشركة SaaS في السلسلة B. تتعامل مع 2 مليار حدث/يوم باستعلامات أقل من ثانية، مع تصورات مخصصة وكشف ذكي للشذوذ.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
      category: "Web",
      technologies: "Next.js,PostgreSQL,Recharts,OpenAI",
      liveUrl: "https://example.com",
      githubUrl: null,
      featured: true,
      order: 2,
    },
    {
      slug: "zestful-mobile",
      titleEn: "Zestful Mobile App",
      titleAr: "تطبيق Zestful للموبايل",
      descriptionEn: "A consumer wellness app shipped in 14 weeks. Custom onboarding flow, AI meal planning, and offline-first sync. 4.8 stars on the App Store.",
      descriptionAr: "تطبيق صحة استهلاكي تم إطلاقه في 14 أسبوعًا. تدفق تسجيل دخول مخصص، تخطيط وجبات بالذكاء الاصطناعي، ومزامنة أوفلاين أولاً. 4.8 نجوم في App Store.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop",
      category: "Mobile",
      technologies: "React Native,Expo,Tamagui,tRPC",
      liveUrl: "https://example.com",
      githubUrl: null,
      featured: true,
      order: 3,
    },
    {
      slug: "halcyon-brand",
      titleEn: "Halcyon Brand Identity",
      titleAr: "هوية Halcyon البصرية",
      descriptionEn: "A complete brand identity and design system for a Series A fintech. Logo, type system, motion language, and 200+ component variants.",
      descriptionAr: "هوية بصرية كاملة ونظام تصميم لشركة fintech في السلسلة A. الشعار، نظام الكتابة، لغة الحركة، وأكثر من 200 تنويع للمكونات.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop",
      category: "Design",
      technologies: "Figma,After Effects,Framer",
      liveUrl: "https://example.com",
      githubUrl: null,
      featured: false,
      order: 4,
    },
    {
      slug: "mosaic-3d-configurator",
      titleEn: "Mosaic 3D Configurator",
      titleAr: "كونفيجوراتور Mosaic ثلاثي الأبعاد",
      descriptionEn: "A WebGL product configurator for a luxury furniture brand. Real-time material swaps, photorealistic lighting, and AR preview. 4x faster than their previous solution.",
      descriptionAr: "كوينفيجوراتور منتج WebGL لعلامة تجارية للأثاث الفاخر. تبديل المواد في الوقت الفعلي، إضاءة فوتوريالستية، ومعاينة AR. أسرع 4 مرات من الحل السابق.",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop",
      category: "3D",
      technologies: "Three.js,React Three Fiber,Blender",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
      order: 5,
    },
    {
      slug: "veridian-cms",
      titleEn: "Veridian Content Platform",
      titleAr: "منصة محتوى Veridian",
      descriptionEn: "A custom CMS and publishing workflow for a global media company. 12 editorial teams, 8 languages, and an AI translation pipeline.",
      descriptionAr: "نظام CMS مخصص وسير عمل نشر لشركة إعلامية عالمية. 12 فريق تحرير، 8 لغات، وخط أنابيب ترجمة بالذكاء الاصطناعي.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop",
      category: "Web",
      technologies: "Next.js,PostgreSQL,Tiptap,OpenAI",
      liveUrl: null,
      githubUrl: null,
      featured: false,
      order: 6,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  // Articles
  const articles = [
    {
      slug: "why-3d-on-the-web-is-eating-marketing",
      titleEn: "Why 3D on the Web Is Eating Marketing",
      titleAr: "ليه الـ 3D على الويب بياكل التسويق",
      excerptEn: "Once a luxury, real-time 3D is now a conversion lever. Here's how to deploy it without melting your user's GPU.",
      excerptAr: "الـ 3D في الوقت الفعلي بقى رافعة تحويل. إزاي تنشره من غير ما تذوب GPU المستخدم.",
      contentEn: "Five years ago, embedding a real-time 3D scene in a marketing page was a flex. Today, it's table stakes — and a measurable conversion lever.\n\nIn this piece, we walk through the architecture decisions, the lazy-loading tricks, and the GPU budget math that took our clients from 28% to 52% time-on-page.\n\nWe also share the Three.js + Suspense patterns we use to keep first paint under 1.2s on mid-range Android devices.",
      contentAr: "من خمس سنين، تضمين مشهد ثلاثي الأبعاد في الوقت الفعلي في صفحة تسويق كان مجرد استعراض. النهاردة بقى ضرورة، ورافعة تحويل قابلة للقياس.\n\nفي المقال ده بنمشي على قرارات البنية، وحيل الـ lazy-loading، وحسابات ميزانية GPU اللي خلت عملاءنا ينتقلوا من 28% لـ 52% وقت على الصفحة.\n\nكمان بنشارك أنماط Three.js + Suspense اللي بنستخدمها عشان أول رسم يبقى أقل من 1.2 ثانية على أجهزة أندرويد متوسطة.",
      coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&auto=format&fit=crop",
      tags: "three.js,webgl,performance",
      published: true,
      authorId: admin.id,
    },
    {
      slug: "design-systems-for-shipping-fast",
      titleEn: "Design Systems for Shipping Fast",
      titleAr: "أنظمة التصميم للشحن السريع",
      excerptEn: "A design system is a product, not a deliverable. Treat it like one and your team will ship 3x more features per quarter.",
      excerptAr: "نظام التصميم منتج، مش مخرجات. عامله كمنتج وفريقك هيشحن 3 أضعاف المميزات كل ربع سنة.",
      contentEn: "Most design systems die in Figma. The ones that ship — like Vercel's, Linear's, and Stripe's — are treated as products: they have owners, roadmaps, telemetry.\n\nWe break down the 6 rituals that separate a living system from a Figma graveyard, with examples from our work with Mosaic, Halcyon, and Zestful.",
      contentAr: "معظم أنظمة التصميم بتموت في Figma. اللي بتشحن — زي Vercel و Linear و Stripe — بتتعامل كمنتجات: عندها أصحاب، خرائط طريق، تليمتري.\n\nبنفصل الـ 6 طقوس اللي بتفصل بين نظام حي وآخر مدفون في Figma، مع أمثلة من شغلنا مع Mosaic و Halcyon و Zestful.",
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop",
      tags: "design-systems,product",
      published: true,
      authorId: admin.id,
    },
    {
      slug: "the-cost-of-framer-motion",
      titleEn: "The Hidden Cost of Framer Motion",
      titleAr: "التكلفة الخفية لـ Framer Motion",
      excerptEn: "It's delightful. It's also a 60kb dependency. Here's how to keep the polish without the bloat.",
      excerptAr: "حلو. بس كمان 60kb. إزاي تحتفظ بالتلميع من غير التضخم.",
      contentEn: "Framer Motion is the most ergonomic animation library for React. It's also 60kb gzipped, and the layout animation primitives can trigger expensive reflows on low-end devices.\n\nWe benchmarked 5 alternatives and 3 hybrid approaches. Here's what we ship to production, and what we recommend for design-heavy marketing sites vs. dense dashboards.",
      contentAr: "Framer Motion أسهل مكتبة حركة لـ React. بس كمان 60kb مضغوطة، والـ layout animation primitives ممكن تطلق reflows مكلفة على أجهزة ضعيفة.\n\nقارنّا 5 بدائل و 3 طرق هجينة. هنا بنقول إيه اللي بنشحنه في الإنتاج، وإيه اللي بنرشحه لمواقع التسويق الكثيفة في التصميم مقابل الـ dashboards الكثيفة في البيانات.",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop",
      tags: "performance,framer-motion,react",
      published: false,
      authorId: admin.id,
    },
  ];

  for (const a of articles) {
    await prisma.article.create({ data: a });
  }

  // Messages
  const messages = [
    {
      name: "Sara El-Sayed",
      email: "sara@northwind.co",
      subject: "RFP — Product page redesign",
      message: "Hi team, we're exploring a redesign of our product page and loved your recent work. Could you share availability and rough pricing for a 6-week engagement?",
      read: false,
    },
    {
      name: "Marcus Chen",
      email: "marcus@aperture.dev",
      subject: "Phase 2 partnership",
      message: "Following up on our call — we'd love to lock in phase 2 starting Q3. Sending the SOW over separately.",
      read: false,
    },
    {
      name: "Layla Khoury",
      email: "layla@zestful.app",
      subject: "Mobile app scope",
      message: "Quick question — does your studio handle native iOS/Android, or are you React Native only? We need to make a call by Friday.",
      read: true,
    },
    {
      name: "Diego Alvarez",
      email: "diego@halcyon.io",
      subject: "Brand workshop",
      message: "Loved the proposal. Can we book a 2-hour brand workshop with your design lead before signing?",
      read: true,
    },
    {
      name: "Yuki Tanaka",
      email: "yuki@mosaic.studio",
      subject: "AI integration question",
      message: "Curious about your approach to AI integrations — specifically around latency budgets and fallback flows. Do you have a case study?",
      read: false,
    },
  ];

  for (const m of messages) {
    await prisma.message.create({ data: m });
  }

  console.log("✅ Seed complete");
  console.log("   Admin:  admin@example.com / admin123");
  console.log("   Editor: editor@example.com / editor123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
