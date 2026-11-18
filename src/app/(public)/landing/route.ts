import { NextResponse } from 'next/server'

const html = `<!DOCTYPE html><html class="dark" dir="rtl" lang="he"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<meta content="web_standard" name="shell-type">
<title>Callnik - מבצע Black Friday חודש ראשון ב-₪1</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/landing.css">
</head>
<body class="bg-[#0e0e10] text-[#e5e1e4] antialiased selection:bg-[#ff007f] selection:text-white" style="overflow-x:hidden;max-width:100vw;" data-new-gr-c-s-loaded="14.1348.0" data-new-gr-c-s-check-loaded="14.1348.0" data-gr-ext-installed="">
<!-- MAIN -->
<main class="w-full pb-16 pt-8">
<!-- Top Ambient Lights -->
<div class="relative w-full overflow-hidden pointer-events-none">
<div class="absolute -top-40 right-1/4 w-[600px] h-[360px] bg-[#ff007f]/15 rounded-full blur-[140px] animate-pulse" style="animation-duration: 6s;"></div>
<div class="absolute -top-32 left-1/4 w-[500px] h-[320px] bg-blue-600/10 rounded-full blur-[140px]"></div>
</div>
<!-- HERO SECTION -->
<section class="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-16 pt-0">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
<!-- Right Column: Punchy Copy & CTAs -->
<div class="lg:col-span-7 flex flex-col items-start gap-6 text-right reveal-item is-revealed">
<!-- Urgency Badge with Floating & Shimmer -->

<!-- Main Headline -->
<h1 class="text-2xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.18] tracking-tight">
            לא ענית לטלפון?<br>
<span class="text-transparent bg-clip-text bg-gradient-to-l from-[#ff007f] via-[#ff4a8d] to-[#ff9ebb]">
              הלקוח כבר סגר אצל המתחרה.
            </span>
</h1><div class="w-full text-right mt-2 mb-2"><span class="block font-bold text-[#c7c2c7] tracking-tight leading-tight" style="font-size: clamp(27px, 2.5vw, 30px);">רוצה להפסיק לפספס לקוחות?</span></div>
<!-- Sharp 1-Sentence Subtitle -->
<p class="text-base sm:text-lg lg:text-xl text-[#c7c2c7] leading-relaxed max-w-[620px] font-medium">
<strong class="text-white font-bold">Callnik</strong> עונה במקומך לשיחות שלא הספקת לענות, מדברת עם הלקוח בעברית אנושית שוטפת, ושולחת סיכום מלא לוואטסאפ תוך שניות.
          </p>
<!-- Direct Action Row -->
<div class="flex flex-col items-stretch gap-4 w-full max-w-[480px] pt-2">
<a class="btn-elevated animate-neon-pulse inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-gradient-to-l from-[#ff007f] to-[#ff4a8d] text-white text-xl sm:text-2xl font-black shadow-[0_0_35px_rgba(255,0,127,0.5)] hover:shadow-[0_0_50px_rgba(255,0,127,0.8)] transition-all group w-full text-center" href="/register?intro=1">
<span>קח חודש ראשון ב-₪1 בלבד!</span>
</a>

</div>
<!-- Micro-Trust Points -->
<div class="flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-sm sm:text-base font-medium text-[#c7c2c7] pt-2 w-full max-w-[480px]"><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>הקמה ב-5 דקות</span></div><span class="text-[#4a4750] shrink-0">•</span><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>ביטול עצמי בכל רגע</span></div><span class="text-[#4a4750] shrink-0">•</span><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>ללא התחייבות</span></div></div>
</div>
<!-- Left Column: Hero Image Replacement -->
<div class="lg:col-span-5 flex justify-center lg:justify-end reveal-item is-revealed" style="transition-delay: 150ms;">
<div class="relative w-full max-w-[420px]"><div class="absolute -top-5 -right-5 z-20 pointer-events-none" style="opacity:0;animation:bannerPop 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards"><img src="/banner-bf.png" alt="Black Friday" width="150" height="150" style="filter:drop-shadow(0 8px 24px rgba(236,72,153,0.6))"/></div><div class="relative w-full rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_35px_rgba(255,0,127,0.25)] bg-[#141418] group transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,0,127,0.4)] hover:border-pink-500/60">
<img alt="מבצע בלאק פריידיי Callnik" class="w-full h-auto aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" src="/hero-bf.jpg">
<div class="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
</div>
</div>
</section>
<!-- VIDEOS DEMO SECTION -->
<section class="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-16 border-t border-[#201f25]">
<!-- Section Title & Subtitle -->
<div class="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2 reveal-item is-revealed">
<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">נסה בעצמך -<br>דבר עם דנה עכשיו:</h2>

<div class="pt-4 flex justify-center"><a class="btn-elevated inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1c1b21] hover:bg-[#25242d] border-2 border-[#25D366]/60 hover:border-[#25D366] text-white text-base sm:text-lg font-bold transition-all shadow-[0_0_25px_rgba(34,197,94,0.25)] hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]" href="tel:083762282"><span class="material-symbols-outlined text-[#22C55E] text-[22px] animate-bounce" style="animation-duration: 2s;">phone_in_talk</span><span dir="ltr" class="font-mono text-2xl sm:text-3xl font-extrabold tracking-wide text-white">08-3762282</span></a></div></div>
<!-- Videos Grid: 16:9 Landscape + 9:16 Portrait -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto items-stretch"><div class="flex flex-col items-center justify-center reveal-item is-revealed h-full w-full"><div class="interactive-card relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-[#25D366]/40 shadow-[0_15px_45px_rgba(37,211,102,0.15)] ring-1 ring-white/10 hover:border-[#25D366] hover:shadow-[0_20px_50px_rgba(37,211,102,0.3)] flex flex-col"><iframe allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen="" class="w-full h-full object-cover rounded-3xl" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" src="https://player.vimeo.com/video/1243516887?h=cb84cbed8f" title="vimeo-player"></iframe></div></div><div class="flex flex-col items-center justify-center reveal-item is-revealed h-full w-full"><div class="interactive-card relative w-full max-w-[320px] aspect-[9/16] rounded-3xl shadow-[0_15px_45px_rgba(37,211,102,0.15)] border-2 border-[#25D366]/40 ring-1 ring-white/10 overflow-hidden hover:border-[#25D366] hover:shadow-[0_20px_50px_rgba(37,211,102,0.3)] flex flex-col justify-between bg-black"><div class="bg-[#075e54] px-4 py-3 flex items-center justify-between text-white shrink-0 z-10"><div class="flex items-center gap-2.5"><div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white border border-white/20">C</div><div class="text-right"><div class="flex items-center gap-1"><span class="font-bold text-xs sm:text-sm text-white">Callnik</span><span class="material-symbols-outlined text-[#25D366] text-[15px]">verified</span></div><span class="text-[10px] text-[#cfd8dc]">מענה קולי חכם • מחובר/ת</span></div></div><div class="flex items-center gap-2 text-white/80"><span class="material-symbols-outlined text-[18px] hover:text-white cursor-pointer transition-colors">videocam</span><span class="material-symbols-outlined text-[18px] hover:text-white cursor-pointer transition-colors">call</span><span class="material-symbols-outlined text-[18px] hover:text-white cursor-pointer transition-colors">more_vert</span></div></div><div class="wa-chat-bg p-4 flex-1 flex flex-col justify-between overflow-hidden"><div class="text-center my-1"><span class="inline-block bg-[#ffffff]/80 backdrop-blur-sm text-[#54656f] text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">היום</span></div><div class="wa-bubble-animate relative bg-white text-[#111b21] rounded-2xl rounded-tr-none p-3.5 shadow-md border border-[#000000]/5 text-right self-start w-full transition-transform duration-300 hover:scale-[1.01] is-revealed" dir="rtl"><div class="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-[#f0f2f5] text-[11px] font-semibold text-[#54656f]"><div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#25D366] animate-ping" style="animation-duration: 2.5s;"></span><span class="text-[#075e54] font-bold">Callnik</span></div><span class="text-[#667781] font-mono text-[10px]">11:13</span></div><div class="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-[#111b21]"><p class="font-bold text-[#111b21]">הודעה חדשה מ-דניאל ב-11:13.</p><p class="text-[#3b4a54]">ביקש הצעת מחיר למטבח קומפלט ולחזור אליו בהקדם האפשרי</p><p class="text-[#111b21] font-bold">לחזרה: <span class="text-[#027eb5] font-mono underline hover:text-[#015f8a] transition-colors" dir="ltr">055-3092131</span> — Callnik</p></div><div class="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e7fce9] border border-[#25D366]/40 text-[#075e54] font-bold text-xs hover:bg-[#d5f9d8] transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 group"><span class="material-symbols-outlined text-[18px] text-[#25D366] transition-transform duration-300 group-hover:scale-110 animate-pulse">volume_up</span><span>[האזן להקלטה]</span><span class="text-[#667781] font-mono text-[10px]">0:42</span></div><div class="flex items-center justify-end gap-1 mt-2 text-[10px] text-[#667781]"><span>11:13</span><span class="material-symbols-outlined text-[#53bdeb] text-[14px]">done_all</span></div></div><div class="flex items-center justify-center py-1 opacity-75"><span class="text-[10px] text-[#667781] font-medium">🔒 הודעות מוצפנות מקצה לקצה</span></div></div></div></div></div>
</section>
<!-- SECTION: WA MOCKUP (אותנטי בסגנון WhatsApp: רקע #EFE7DD ובועה לבנה) -->

<!-- SECTION: VOICES (6 קולות עם קבצי callnik.com אמיתיים) -->
<section class="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-16 border-t border-[#201f25]">
<div class="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2 reveal-item is-revealed">
<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">תבחר קול שמתאים לעסק שלך</h2>
<p class="text-base sm:text-lg text-[#a9a4aa]">6 קולות עבריים טבעיים - לחץ לשמוע כל אחד</p>
</div>
<!-- Voices Grid: 6 in row on desktop with staggered entrance -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5" id="voices-container">
<!-- Voice 1: דנה -->
<div class="voice-card reveal-item group relative bg-[#141418] border rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border-[#2d2a33] hover:border-[#ff4a8d]/60 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%93%D7%A0%D7%94.mp3" style="transition-delay: 50ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="דנה" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-דנה.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">דנה</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול נשי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">play_circle</span><span>שמע קול</span></span>
</div>
<!-- Voice 2: עלמה -->
<div class="voice-card reveal-item group relative bg-[#141418] border border-[#2d2a33] hover:border-[#ff4a8d]/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%A2%D7%9C%D7%9E%D7%94.mp3" style="transition-delay: 100ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="עלמה" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-עלמה.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">עלמה</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול נשי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">play_circle</span>
<span>שמע קול</span>
</span>
</div>
<!-- Voice 3: נועה -->
<div class="voice-card reveal-item group relative bg-[#141418] border border-[#2d2a33] hover:border-[#ff4a8d]/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%A0%D7%95%D7%A2%D7%94.mp3" style="transition-delay: 150ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="נועה" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-נועה.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">נועה</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול נשי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">play_circle</span>
<span>שמע קול</span>
</span>
</div>
<!-- Voice 4: עדן -->
<div class="voice-card reveal-item group relative bg-[#141418] border border-[#2d2a33] hover:border-[#ff4a8d]/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%A2%D7%93%D7%9F.mp3" style="transition-delay: 200ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="עדן" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-עדן.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">עדן</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול נשי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">play_circle</span>
<span>שמע קול</span>
</span>
</div>
<!-- Voice 5: קובי -->
<div class="voice-card reveal-item group relative bg-[#141418] border border-[#2d2a33] hover:border-[#ff4a8d]/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%A7%D7%95%D7%91%D7%99.mp3" style="transition-delay: 250ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="קובי" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-קובי.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">קובי</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול גברי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">play_circle</span>
<span>שמע קול</span>
</span>
</div>
<!-- Voice 6: יואב -->
<div class="voice-card reveal-item group relative bg-[#141418] border border-[#2d2a33] hover:border-[#ff4a8d]/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,74,141,0.2)] is-revealed" data-src="/voices/%D7%99%D7%95%D7%90%D7%91.mp3" style="transition-delay: 300ms;">
<div class="avatar-ring relative w-20 h-20 rounded-full p-1 border-2 border-transparent transition-all duration-300 mb-3 group-hover:scale-105">
<img alt="יואב" class="w-full h-full rounded-full object-cover transition-transform duration-300" src="/voices/photo-יואב.jpg">
<div class="play-overlay absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
<span class="material-symbols-outlined text-white text-[28px] transform group-hover:scale-110 transition-transform">play_arrow</span>
</div>
</div>
<h3 class="text-base font-bold text-white mb-0.5 group-hover:text-[#ff4a8d] transition-colors">יואב</h3>
<span class="text-[11px] font-semibold text-[#c7c2c7] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 mb-2">קול גברי</span>
<span class="status-indicator text-xs font-bold text-[#ff4a8d] flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">play_circle</span>
<span>שמע קול</span>
</span>
</div>
</div>
</section>
<!-- SECTION: PRICING (בחר תוכנית) -->
<section class="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-16 border-t border-[#201f25]">
<div class="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-3 reveal-item is-revealed">
<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">בחר תוכנית</h2>
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1b21] border border-[#ff007f]/40 shadow-sm animate-float">
<span class="text-xs sm:text-sm font-bold shimmer-text">⚡ חודש ראשון ב-₪1 לנובמבר 2026 בלבד</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto items-stretch"><!-- Basic Plan Card -->
<div class="interactive-card relative rounded-3xl bg-[#141418] border border-[#2d2a33] p-8 flex flex-col justify-between reveal-item is-revealed hover:border-[#ff007f]/50 transition-all duration-300">
  <div>
    <div class="flex items-center justify-between gap-2 mb-4">
      <h3 class="text-2xl font-bold text-white">Basic</h3>
      <span class="text-xs font-bold text-[#c7c2c7] bg-white/5 px-3 py-1 rounded-full border border-white/10">לכל בעל עסק</span>
    </div>
    <p class="text-sm text-[#a9a4aa] mb-6 min-h-[40px]">פתרון מושלם לכל בעל עסק שלא רוצה לאבד לידים ושיחות חשובות</p>
    <div class="mb-6 p-4 rounded-2xl bg-[#1c1b21] border border-[#2d2a33]/60">
      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-4xl font-black text-white">₪1</span>
        <span class="text-xs text-[#a9a4aa]">לחודש הראשון</span>
      </div>
      <span class="text-xs text-[#8e898e]">לאחר מכן ₪99 + מע״מ לחודש</span>
    </div>
    <ul class="space-y-3 mb-8 text-sm text-[#e5e1e4]">
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>עד 60 שיחות בחודש (99 אג׳ לשיחה נוספת)</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>6 קולות AI עבריים איכותיים לבחירה</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>תמלול מלא והקלטה של כל שיחה</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>סיכום מיידי בוואטסאפ ובמייל</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>הגדרה ב-5 דקות וללא התחייבות</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>ביטול עצמי בכל רגע בקליק</span></li>
    </ul>
  </div>
  <a class="btn-elevated w-full py-4 px-6 rounded-full bg-[#1c1b21] hover:bg-[#25242d] border border-[#2d2a33] hover:border-[#ff4a8d]/60 text-white font-bold text-center text-base transition-all block" href="/register?intro=1">
    הצטרף ל-Basic
  </a>
</div>

<!-- Pro Plan Card (Recommended) -->
<div class="interactive-card relative rounded-3xl bg-gradient-to-b from-[#1c1b21] to-[#141418] border-2 border-[#ff007f] p-8 flex flex-col justify-between reveal-item is-revealed shadow-[0_0_35px_rgba(255,0,127,0.25)] transition-all duration-300">
  <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-l from-[#ff007f] to-[#ff4a8d] text-white text-xs font-black px-4 py-1 rounded-full shadow-md whitespace-nowrap">
    ★ מומלץ ביותר
  </div>
  <div>
    <div class="flex items-center justify-between gap-2 mb-4">
      <h3 class="text-2xl font-bold text-white">Pro</h3>
      <span class="text-xs font-bold text-[#ff4a8d] bg-[#ff007f]/15 px-3 py-1 rounded-full border border-[#ff007f]/40">כולל יומן</span>
    </div>
    <p class="text-sm text-[#a9a4aa] mb-6 min-h-[40px]">מערכת תיאומים אוטומטית מלאה כולל סנכרון יומן פגישות אישי</p>
    <div class="mb-6 p-4 rounded-2xl bg-[#141418] border border-[#ff007f]/30">
      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-4xl font-black text-white">₪1</span>
        <span class="text-xs text-[#a9a4aa]">לחודש הראשון</span>
      </div>
      <span class="text-xs text-[#8e898e]">לאחר מכן ₪199 + מע״מ לחודש</span>
    </div>
    <ul class="space-y-3 mb-8 text-sm text-[#e5e1e4]">
      <li class="flex items-center gap-2 font-semibold text-white"><span class="text-[#22C55E] font-bold">✓</span><span>כל מה שכלול במסלול Basic</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>קביעת פגישות אוטומטית ב-Google Calendar</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>סיכום פגישה מפורט בוואטסאפ ללקוח ולך</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>בדיקת זמינות יומן בזמן אמת בשיחה</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>תמיכה אישית בהקמה וחיבור יומן</span></li>
      <li class="flex items-center gap-2"><span class="text-[#22C55E] font-bold">✓</span><span>ביטול עצמי בכל רגע בקליק</span></li>
    </ul>
  </div>
  <a class="btn-elevated animate-neon-pulse w-full py-4 px-6 rounded-full bg-gradient-to-l from-[#ff007f] to-[#ff4a8d] text-white font-black text-center text-base shadow-[0_0_25px_rgba(255,0,127,0.4)] hover:shadow-[0_0_35px_rgba(255,0,127,0.7)] transition-all block" href="/register?intro=1&amp;tier=pro">
    הצטרף ל-Pro
  </a>
</div></div>
</section>
<!-- SECTION: FAQ (7 שאלות ותשובות מלאות) -->
<section class="relative z-10 w-full max-w-[900px] mx-auto px-5 sm:px-8 py-16 border-t border-[#201f25]">
<div class="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2 reveal-item is-revealed">
<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">שאלות נפוצות</h2>
<p class="text-base text-[#a9a4aa]">כל מה שחשוב לדעת לפני שמצטרפים</p>
</div>
<div class="space-y-3">
<!-- Item 1 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 50ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">מי מגדיר את השירות על הקו שלי?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
אתה, דרך הפאנל שלנו. זה פשוט בצורה שתפתיע אותך - ברוב המקרים גומרים בפחות מ-10 דקות. ואם נתקעת איפשהו, תכתוב לנו ונעבור על זה ביחד :)
</div>
</details>
<!-- Item 2 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 100ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">האם אני צריך להחליף מספר טלפון?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
לא. המספר שלך נשאר בדיוק כמו שהוא. Callnik נכנסת לתמונה רק כשאתה לא עונה - הלקוח ידע שדיבר עם מישהו, לאו דווקא שזה היה AI.
</div>
</details>
<!-- Item 3 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 150ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">כמה זמן לוקחת ההגדרה?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
בין 5 ל-10 דקות בפעם הראשונה. בוחרים קול, כותבים כמה מילים על העסק - ומוכנים. לא צריך טכנאי, לא צריך לתאם עם בזק, כלום.
</div>
</details>
<!-- Item 4 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 200ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">מה קורה אחרי 60 שיחות?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
ממשיכים לענות כמו תמיד, בלי שום הפרעה. בסוף החודש מוסיפים 99 אגורות על כל שיחה מעל 60. עסק עם 80 שיחות ישלם בסך הכל ₪118.80. לרוב העסקים הקטנים זה בכלל לא מגיע לזה.
</div>
</details>
<!-- Item 5 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 250ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">האם אפשר לבטל?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
כן, בכל עת. מייל אחד, ביטול בלי שאלות ובלי קנסות. אנחנו לא מאמינים בחוזים שמחזיקים אנשים בכוח. שים לב: מחיר ההיכרות ₪1 ניתן פעם אחת בלבד - חזרה לאחר ביטול מתבצעת במחיר המלא ₪99/חודש.
</div>
</details>
<!-- Item 6 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 300ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">האם המזכירה יכולה לקבוע פגישות?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
כן. מחברים את יומן Google מהפאנל - ואז המזכירה תציע ללקוח לקבוע פגישה ישירות. הפגישה נרשמת ביומן אוטומטית, וסיכום מגיע לוואטסאפ כרגיל.
</div>
</details>
<!-- Item 7 -->
<details class="group rounded-2xl bg-[#141418] border border-[#2d2a33] overflow-hidden transition-all duration-300 hover:border-[#ff007f]/50 hover:bg-[#181820] reveal-item is-revealed" style="transition-delay: 350ms;">
<summary class="flex items-center justify-between p-5 cursor-pointer list-none select-none text-right">
<span class="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4a8d] transition-colors">באיזה קול דנה מדברת עם הלקוחות שלי?</span>
<span class="material-symbols-outlined text-[#ff4a8d] faq-chevron text-[24px]">expand_more</span>
</summary>
<div class="px-5 pb-5 text-sm sm:text-base text-[#c7c2c7] leading-relaxed border-t border-[#201f25] pt-3">
יש 6 קולות עבריים לבחירה - 4 נשיים ו-2 גבריים, שונים בצביון ובאופי. לפני שמחליטים, שומעים כל אחד בפועל. מה שנשמע הכי טבעי לעסק שלך - זה מה שלוקחים.
</div>
</details>
</div>
</section>
<!-- FINAL CLEAN OFFER BOX -->
<section class="relative z-10 w-full max-w-[760px] mx-auto px-5 sm:px-8 pt-8 pb-12 reveal-item is-revealed">
<div class="interactive-card relative rounded-3xl bg-gradient-to-b from-[#1c1b21] to-[#141418] p-8 sm:p-12 text-center border border-[#ff007f]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,0,127,0.2)] overflow-hidden">
<!-- Glowing accent top bar -->
<div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff007f] to-transparent"></div>
<!-- Big Price Display with Shimmer -->
<div class="flex flex-col items-center justify-center gap-1 mb-3">
<span class="text-6xl sm:text-8xl font-black shimmer-text tracking-tight leading-none">
            ₪1 בלבד
          </span>
<span class="text-xl sm:text-2xl font-bold text-white mt-1">לחודש הראשון</span>
</div>
<!-- Subtitle details -->
<p class="text-sm sm:text-base text-[#b5b0b6] font-medium max-w-md mx-auto mb-8">
          לאחר מכן רק ₪99 + מע״מ לחודש | ביטול בקליק בכל רגע
        </p>
<!-- CTA Buttons -->
<div class="flex flex-col items-center gap-4">
<a class="btn-elevated animate-neon-pulse w-full sm:w-auto min-w-[320px] px-8 py-4 rounded-full bg-gradient-to-l from-[#ff007f] to-[#ff4a8d] text-white text-lg font-black shadow-[0_0_35px_rgba(255,0,127,0.5)] hover:shadow-[0_0_50px_rgba(255,0,127,0.8)] transition-all flex items-center justify-center gap-2 group" href="/register?intro=1">
<span>אני רוצה להצטרף עכשיו ב-₪1</span>
<span class="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:-translate-x-1.5">arrow_back</span>
</a>
</div>
</div>
</section>
</main>
<!-- FOOTER -->
<footer dir="rtl" style="background:#000;border-top:1px solid #1a1a1a;padding:3rem 1.25rem 1.5rem;font-family:Rubik,sans-serif;color:#666;font-size:0.875rem;">
<div style="max-width:1200px;margin:0 auto;">
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:2rem;margin-bottom:2.5rem;">
    <div>
      <img src="/callnik-logo.png" alt="Callnik" style="height:22px;width:auto;object-fit:contain;opacity:0.7;" />
      <p style="color:#444;font-size:0.75rem;margin-top:0.75rem;line-height:1.6;max-width:200px;">מזכירה AI בעברית שעונה כשאתה לא יכול.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.6rem;">
      <p style="color:#444;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.25rem;">מוצר</p>
      <a href="/how-it-works" style="color:#666;text-decoration:none;">איך זה עובד</a>
      <a href="/pricing" style="color:#666;text-decoration:none;">מחירים</a>
      <a href="/faq" style="color:#666;text-decoration:none;">שאלות נפוצות</a>
      <a href="/about" style="color:#666;text-decoration:none;">אודות</a>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.6rem;">
      <p style="color:#444;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.25rem;">משפטי</p>
      <a href="/terms" style="color:#666;text-decoration:none;">תקנון</a>
      <a href="/privacy" style="color:#666;text-decoration:none;">פרטיות</a>
      <a href="/accessibility" style="color:#666;text-decoration:none;">נגישות</a>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.6rem;">
      <p style="color:#444;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.25rem;">יצירת קשר</p>
      <a href="mailto:mail@callnik.com" style="color:#666;text-decoration:none;">mail@callnik.com</a>
    </div>
  </div>
  <div style="border-top:1px solid #1a1a1a;padding-top:1.25rem;padding-bottom:0.75rem;font-size:0.72rem;color:#444;line-height:1.75;text-align:right;">
    <span style="font-weight:600;color:#555;">הגבלת אחריות:</span> השירות מסופק כפי שהוא (as-is), ללא אחריות לשלמות המידע, לדיוקו או לזמינות רציפה. עיבוד השיחות מבוסס על בינה מלאכותית ועשוי להכיל שגיאות בתמלול, באיות שמות, במספרי טלפון, או בפרטים שנמסרו בעל-פה על ידי המתקשר. Callnik אינה מאמתת מידע שמסרו מתקשרים ואינה אחראית לכל נזק הנובע מהסתמכות על פרטים אלה. תגובות הנציגה הווירטואלית מבוססות על AI ועשויות להכיל שגיאות, אי-דיוקים, או מידע שאינו עדכני על העסק — Callnik אינה אחראית לנזק שיגרם מהסתמכות על תשובות הנציגה. הודעה תגיע לבעל העסק בכפוף לכך שהמתקשר מסר פרטי יצירת קשר. Callnik לא תישא באחריות לשיחות שלא הגיעו ליעדן, לכשלי תשתיות טלפוניה, לשיבושים אצל ספקי צד שלישי, או לכל נזק עקיף הנובע משימוש בשירות. השירות מיועד לקליטת פניות בלבד ואין לראות בו ייעוץ מקצועי, רפואי, משפטי, פיננסי או אחר. Callnik רשאית לשנות את מחיר השירות, היקפו ותנאיו בכל עת, בהתראה מוקדמת למנויים פעילים. שימוש בשירות מהווה הסכמה ל<a href="/terms" style="color:#555;text-decoration:underline;">תנאי השימוש המלאים</a>.
  </div>
  <div style="border-top:1px solid #1a1a1a;padding-top:1rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.5rem;font-size:0.72rem;color:#444;">
    <div style="display:flex;flex-direction:column;gap:0.25rem;text-align:right;">
      <span>© 2026 Callnik. כל הזכויות שמורות.</span>
      <span>MediaUp | ת"ד 20467, תל אביב 6120302</span>
    </div>
    <a href="/admin" style="color:#333;text-decoration:none;">ניהול</a>
  </div>
</div>
</footer>
<!-- Accessibility Widget -->
<script src="https://widget.tabnav.com/limited-widget.min.js.gz" async></script>
<!-- Privacy Banner -->
<div id="privacy-banner" style="position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(14,14,16,0.97);backdrop-filter:blur(12px);border-top:1px solid #2d2a33;padding:0.75rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;font-family:Rubik,sans-serif;font-size:0.8rem;color:#a9a4aa;" dir="rtl">
  <span>אנו משתמשים בעוגיות (Cookies) לשיפור הגלישה. <a href="/privacy" style="color:#ff4a8d;text-decoration:underline;">מדיניות פרטיות</a> | <a href="/terms" style="color:#a9a4aa;text-decoration:none;">תנאי שימוש</a></span>
  <button onclick="document.getElementById('privacy-banner').style.display='none';localStorage.setItem('cookiesOk','1')" style="background:linear-gradient(to left,#ff007f,#ff4a8d);color:#fff;border:none;border-radius:9999px;padding:0.5rem 1.25rem;font-family:Rubik,sans-serif;font-weight:700;font-size:0.8rem;cursor:pointer;white-space:nowrap;">הבנתי, המשך</button>
</div>
<script>if(localStorage.getItem('cookiesOk'))document.getElementById('privacy-banner').style.display='none';</script>
<!-- Audio Player for Voices -->
<script>
(function() {
  var currentAudio = null;
  var currentCard = null;

  var cards = document.querySelectorAll('.voice-card');

  function resetCard(card) {
    var ring = card.querySelector('.avatar-ring');
    var indicator = card.querySelector('.status-indicator');
    card.classList.remove('border-[#22C55E]','shadow-[0_0_25px_rgba(34,197,94,0.35)]','bg-[#181f1a]');
    card.classList.add('border-[#2d2a33]');
    if (ring) { ring.classList.remove('ring-4','ring-[#22C55E]','border-[#22C55E]','shadow-[0_0_15px_rgba(34,197,94,0.5)]'); }
    if (indicator) { indicator.innerHTML = '<span class="material-symbols-outlined text-[16px]">play_circle</span><span>שמע קול</span>'; }
  }

  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      var audioSrc = card.getAttribute('data-src');
      var ring = card.querySelector('.avatar-ring');
      var indicator = card.querySelector('.status-indicator');

      if (currentCard === card && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        resetCard(card);
        currentAudio = null;
        currentCard = null;
        return;
      }

      if (currentAudio) {
        currentAudio.pause();
        if (currentCard) resetCard(currentCard);
      }

      var audio = new Audio(audioSrc);
      currentAudio = audio;
      currentCard = card;

      card.classList.add('border-[#22C55E]','shadow-[0_0_25px_rgba(34,197,94,0.35)]','bg-[#181f1a]');
      card.classList.remove('border-[#2d2a33]');
      if (ring) { ring.classList.add('ring-4','ring-[#22C55E]','border-[#22C55E]','shadow-[0_0_15px_rgba(34,197,94,0.5)]'); }
      if (indicator) {
        indicator.innerHTML = '<div class="flex items-center gap-1.5 text-[#22C55E] font-bold"><span class="flex items-center gap-[2px] h-4"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span><span>מנגן...</span></div>';
      }

      audio.play().catch(function() { resetCard(card); });
      audio.onended = function() {
        resetCard(card);
        if (currentAudio === audio) { currentAudio = null; currentCard = null; }
      };
      audio.onerror = function() {
        resetCard(card);
        if (currentAudio === audio) { currentAudio = null; currentCard = null; }
      };
    });
  });
})();
</script>`

export async function GET() {
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
