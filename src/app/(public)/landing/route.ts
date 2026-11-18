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
<style>
    @layer base {
      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Rubik', sans-serif;
        background-color: #0e0e10;
        color: #e5e1e4;
        scroll-behavior: smooth;
      }
      body {
        overscroll-behavior: none;
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
    details summary::-webkit-details-marker {
      display: none;
    }
    .wa-chat-bg {
      background-color: #efe7dd;
      background-image: radial-gradient(#d3c8b9 1.2px, transparent 1.2px);
      background-size: 18px 18px;
    }

    /* Keyframe Animations & Micro-Interactions */
    @keyframes neonPulsePink {
      0%, 100% {
        box-shadow: 0 0 25px rgba(255, 0, 127, 0.45), 0 0 50px rgba(255, 0, 127, 0.2);
      }
      50% {
        box-shadow: 0 0 35px rgba(255, 0, 127, 0.75), 0 0 65px rgba(255, 0, 127, 0.4);
      }
    }

    @keyframes neonBorderPulse {
      0%, 100% {
        border-color: rgba(255, 0, 127, 0.8);
        box-shadow: 0 0 30px rgba(255, 0, 127, 0.25);
      }
      50% {
        border-color: rgba(255, 74, 141, 1);
        box-shadow: 0 0 50px rgba(255, 0, 127, 0.45);
      }
    }

    @keyframes floatBreathing {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-4px);
      }
    }

    @keyframes shimmerMove {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes soundwaveBar {
      0%, 100% {
        height: 4px;
      }
      50% {
        height: 16px;
      }
    }

    @keyframes waBubblePop {
      0% {
        opacity: 0;
        transform: scale(0.92) translateY(12px);
      }
      70% {
        transform: scale(1.02) translateY(-2px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .animate-neon-pulse {
      animation: neonPulsePink 3s infinite ease-in-out;
    }

    .animate-border-glow {
      animation: neonBorderPulse 3.5s infinite ease-in-out;
    }

    .animate-float {
      animation: floatBreathing 4s infinite ease-in-out;
    }

    .shimmer-text {
      background: linear-gradient(90deg, #ff007f 0%, #ffffff 45%, #ff4a8d 70%, #ff007f 100%);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: shimmerMove 4s linear infinite;
    }

    /* Scroll reveal transitions */
    .reveal-item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    .reveal-item.is-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    /* Voice equalizer bars */
    .eq-bar {
      width: 2.5px;
      background-color: #22C55E;
      border-radius: 9999px;
      display: inline-block;
      animation: soundwaveBar 1s infinite ease-in-out;
    }
    .eq-bar:nth-child(1) { animation-delay: 0.1s; height: 6px; }
    .eq-bar:nth-child(2) { animation-delay: 0.35s; height: 14px; }
    .eq-bar:nth-child(3) { animation-delay: 0.2s; height: 10px; }
    .eq-bar:nth-child(4) { animation-delay: 0.45s; height: 16px; }

    /* WhatsApp entrance animation */
    .wa-bubble-animate {
      opacity: 0;
    }
    .wa-bubble-animate.is-revealed {
      animation: waBubblePop 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    /* Micro-interactions & Smooth Transitions */
    .interactive-card {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .interactive-card:hover {
      transform: translateY(-4px);
    }

    .btn-elevated {
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-elevated:hover {
      transform: translateY(-3px) scale(1.02);
    }
    .btn-elevated:active {
      transform: translateY(0) scale(0.98);
    }

    /* FAQ accordion styling */
    details summary {
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }
    details[open] summary .faq-chevron {
      transform: rotate(180deg);
    }
    .faq-chevron {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Reduced Motion Respect */
    @media (prefers-reduced-motion: reduce) {
      *, ::before, ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      .reveal-item {
        opacity: 1 !important;
        transform: none !important;
      }
      .wa-bubble-animate {
        opacity: 1 !important;
        animation: none !important;
      }
    }
  </style>



<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DYGG736MTW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DYGG736MTW');</script>
<!-- Meta Pixel -->
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1390411759265975');fbq('track','PageView');</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1390411759265975&ev=PageView&noscript=1"/></noscript>
<!-- Clarity -->
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","zf99s81vxz");</script>
<!-- BF Banner keyframe -->
<style>@keyframes bannerPop{0%{opacity:0;transform:rotate(-18deg) scale(0.2)}100%{opacity:1;transform:rotate(-10deg) scale(1)}}</style>
<style>*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Rubik,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.inset-1{inset:.25rem}.inset-x-0{left:0;right:0}.-right-5{right:-1.25rem}.-top-3\.5{top:-.875rem}.-top-32{top:-8rem}.-top-40{top:-10rem}.-top-5{top:-1.25rem}.left-0{left:0}.left-1\/2{left:50%}.left-1\/4{left:25%}.right-0{right:0}.right-1\/4{right:25%}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.mb-0\.5{margin-bottom:.125rem}.mb-1{margin-bottom:.25rem}.mb-1\.5{margin-bottom:.375rem}.mb-12{margin-bottom:3rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-2\.5{margin-top:.625rem}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.aspect-\[9\/16\]{aspect-ratio:9/16}.aspect-square{aspect-ratio:1/1}.h-1{height:.25rem}.h-16{height:4rem}.h-2{height:.5rem}.h-20{height:5rem}.h-9{height:2.25rem}.h-\[320px\]{height:320px}.h-\[360px\]{height:360px}.h-auto{height:auto}.h-full{height:100%}.min-h-\[40px\]{min-height:40px}.w-2{width:.5rem}.w-20{width:5rem}.w-9{width:2.25rem}.w-\[500px\]{width:500px}.w-\[600px\]{width:600px}.w-auto{width:auto}.w-full{width:100%}.min-w-\[320px\]{min-width:320px}.max-w-2xl{max-width:42rem}.max-w-\[1200px\]{max-width:1200px}.max-w-\[320px\]{max-width:320px}.max-w-\[420px\]{max-width:420px}.max-w-\[480px\]{max-width:480px}.max-w-\[620px\]{max-width:620px}.max-w-\[760px\]{max-width:760px}.max-w-\[900px\]{max-width:900px}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.-translate-x-1\/2{--tw-translate-x:-50%}.-translate-x-1\/2,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes bounce{0%,to{transform:translateY(-25%);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;animation-timing-function:cubic-bezier(0,0,.2,1)}}.animate-bounce{animation:bounce 1s infinite}@keyframes ping{75%,to{transform:scale(2);opacity:0}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.list-none{list-style-type:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-1\.5{gap:.375rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-2\.5{gap:.625rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.space-y-1\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem*var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.75rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem*var(--tw-space-y-reverse))}.self-start{align-self:flex-start}.overflow-hidden{overflow:hidden}.whitespace-nowrap{white-space:nowrap}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.rounded-tr-none{border-top-right-radius:0}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-\[\#000000\]\/5{border-color:#0000000d}.border-\[\#201f25\]{--tw-border-opacity:1;border-color:rgb(32 31 37/var(--tw-border-opacity,1))}.border-\[\#25D366\]\/40{border-color:#25d36666}.border-\[\#25D366\]\/60{border-color:#25d36699}.border-\[\#2d2a33\]{--tw-border-opacity:1;border-color:rgb(45 42 51/var(--tw-border-opacity,1))}.border-\[\#2d2a33\]\/60{border-color:#2d2a3399}.border-\[\#f0f2f5\]{--tw-border-opacity:1;border-color:rgb(240 242 245/var(--tw-border-opacity,1))}.border-\[\#ff007f\]{--tw-border-opacity:1;border-color:rgb(255 0 127/var(--tw-border-opacity,1))}.border-\[\#ff007f\]\/30{border-color:#ff007f4d}.border-\[\#ff007f\]\/40{border-color:#ff007f66}.border-\[\#ff007f\]\/50{border-color:#ff007f80}.border-pink-500\/30{border-color:#ec48994d}.border-transparent{border-color:#0000}.border-white\/10{border-color:#ffffff1a}.border-white\/20{border-color:#fff3}.bg-\[\#075e54\]{--tw-bg-opacity:1;background-color:rgb(7 94 84/var(--tw-bg-opacity,1))}.bg-\[\#0e0e10\]{--tw-bg-opacity:1;background-color:rgb(14 14 16/var(--tw-bg-opacity,1))}.bg-\[\#0e0e10\]\/85{background-color:#0e0e10d9}.bg-\[\#141418\]{--tw-bg-opacity:1;background-color:rgb(20 20 24/var(--tw-bg-opacity,1))}.bg-\[\#1c1b21\]{--tw-bg-opacity:1;background-color:rgb(28 27 33/var(--tw-bg-opacity,1))}.bg-\[\#25D366\]{--tw-bg-opacity:1;background-color:rgb(37 211 102/var(--tw-bg-opacity,1))}.bg-\[\#e7fce9\]{--tw-bg-opacity:1;background-color:rgb(231 252 233/var(--tw-bg-opacity,1))}.bg-\[\#ff007f\]\/15{background-color:#ff007f26}.bg-\[\#ffffff\]\/80{background-color:#fffc}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.bg-black\/50{background-color:#00000080}.bg-blue-600\/10{background-color:#2563eb1a}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.bg-white\/20{background-color:#fff3}.bg-white\/5{background-color:#ffffff0d}.bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.bg-gradient-to-l{background-image:linear-gradient(to left,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.bg-gradient-to-t{background-image:linear-gradient(to top,var(--tw-gradient-stops))}.from-\[\#0e0e10\]\/80{--tw-gradient-from:#0e0e10cc var(--tw-gradient-from-position);--tw-gradient-to:#0e0e1000 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.from-\[\#1c1b21\]{--tw-gradient-from:#1c1b21 var(--tw-gradient-from-position);--tw-gradient-to:#1c1b2100 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.from-\[\#ff007f\]{--tw-gradient-from:#ff007f var(--tw-gradient-from-position);--tw-gradient-to:#ff007f00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.from-transparent{--tw-gradient-from:#0000 var(--tw-gradient-from-position);--tw-gradient-to:#0000 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.via-\[\#ff007f\]{--tw-gradient-to:#ff007f00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),#ff007f var(--tw-gradient-via-position),var(--tw-gradient-to)}.via-\[\#ff4a8d\]{--tw-gradient-to:#ff4a8d00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),#ff4a8d var(--tw-gradient-via-position),var(--tw-gradient-to)}.via-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),#0000 var(--tw-gradient-via-position),var(--tw-gradient-to)}.to-\[\#141418\]{--tw-gradient-to:#141418 var(--tw-gradient-to-position)}.to-\[\#ff4a8d\]{--tw-gradient-to:#ff4a8d var(--tw-gradient-to-position)}.to-\[\#ff9ebb\]{--tw-gradient-to:#ff9ebb var(--tw-gradient-to-position)}.to-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:.25rem}.p-3\.5{padding:.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-8{padding:2rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-0\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\.5{padding-top:.375rem;padding-bottom:.375rem}.py-16{padding-top:4rem;padding-bottom:4rem}.py-2\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-3\.5{padding-top:.875rem;padding-bottom:.875rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.pb-1\.5{padding-bottom:.375rem}.pb-12{padding-bottom:3rem}.pb-16{padding-bottom:4rem}.pb-5{padding-bottom:1.25rem}.pt-0{padding-top:0}.pt-2{padding-top:.5rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.pt-8{padding-top:2rem}.text-center{text-align:center}.text-right{text-align:right}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-\[10px\]{font-size:10px}.text-\[11px\]{font-size:11px}.text-\[14px\]{font-size:14px}.text-\[15px\]{font-size:15px}.text-\[16px\]{font-size:16px}.text-\[18px\]{font-size:18px}.text-\[22px\]{font-size:22px}.text-\[24px\]{font-size:24px}.text-\[28px\]{font-size:28px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-\[1\.18\]{line-height:1.18}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-.025em}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-\[\#027eb5\]{--tw-text-opacity:1;color:rgb(2 126 181/var(--tw-text-opacity,1))}.text-\[\#075e54\]{--tw-text-opacity:1;color:rgb(7 94 84/var(--tw-text-opacity,1))}.text-\[\#111b21\]{--tw-text-opacity:1;color:rgb(17 27 33/var(--tw-text-opacity,1))}.text-\[\#22C55E\]{--tw-text-opacity:1;color:rgb(34 197 94/var(--tw-text-opacity,1))}.text-\[\#25D366\]{--tw-text-opacity:1;color:rgb(37 211 102/var(--tw-text-opacity,1))}.text-\[\#3b4a54\]{--tw-text-opacity:1;color:rgb(59 74 84/var(--tw-text-opacity,1))}.text-\[\#4a4750\]{--tw-text-opacity:1;color:rgb(74 71 80/var(--tw-text-opacity,1))}.text-\[\#53bdeb\]{--tw-text-opacity:1;color:rgb(83 189 235/var(--tw-text-opacity,1))}.text-\[\#54656f\]{--tw-text-opacity:1;color:rgb(84 101 111/var(--tw-text-opacity,1))}.text-\[\#667781\]{--tw-text-opacity:1;color:rgb(102 119 129/var(--tw-text-opacity,1))}.text-\[\#8e898e\]{--tw-text-opacity:1;color:rgb(142 137 142/var(--tw-text-opacity,1))}.text-\[\#a9a4aa\]{--tw-text-opacity:1;color:rgb(169 164 170/var(--tw-text-opacity,1))}.text-\[\#b5b0b6\]{--tw-text-opacity:1;color:rgb(181 176 182/var(--tw-text-opacity,1))}.text-\[\#c7c2c7\]{--tw-text-opacity:1;color:rgb(199 194 199/var(--tw-text-opacity,1))}.text-\[\#cfd8dc\]{--tw-text-opacity:1;color:rgb(207 216 220/var(--tw-text-opacity,1))}.text-\[\#e5e1e4\]{--tw-text-opacity:1;color:rgb(229 225 228/var(--tw-text-opacity,1))}.text-\[\#ff007f\]{--tw-text-opacity:1;color:rgb(255 0 127/var(--tw-text-opacity,1))}.text-\[\#ff4a8d\]{--tw-text-opacity:1;color:rgb(255 74 141/var(--tw-text-opacity,1))}.text-transparent{color:#0000}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.text-white\/80{color:#fffc}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-0{opacity:0}.opacity-75{opacity:.75}.shadow-\[0_0_20px_rgba\(255\2c 0\2c 127\2c 0\.35\)\]{--tw-shadow:0 0 20px #ff007f59;--tw-shadow-colored:0 0 20px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_0_25px_rgba\(255\2c 0\2c 127\2c 0\.4\)\]{--tw-shadow:0 0 25px #ff007f66;--tw-shadow-colored:0 0 25px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_0_25px_rgba\(34\2c 197\2c 94\2c 0\.25\)\]{--tw-shadow:0 0 25px #22c55e40;--tw-shadow-colored:0 0 25px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_0_35px_rgba\(255\2c 0\2c 127\2c 0\.25\)\]{--tw-shadow:0 0 35px #ff007f40;--tw-shadow-colored:0 0 35px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_0_35px_rgba\(255\2c 0\2c 127\2c 0\.5\)\]{--tw-shadow:0 0 35px #ff007f80;--tw-shadow-colored:0 0 35px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_15px_45px_rgba\(37\2c 211\2c 102\2c 0\.15\)\]{--tw-shadow:0 15px 45px #25d36626;--tw-shadow-colored:0 15px 45px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-\[0_20px_60px_rgba\(0\2c 0\2c 0\2c 0\.8\)\2c 0_0_40px_rgba\(255\2c 0\2c 127\2c 0\.2\)\]{--tw-shadow:0 20px 60px #000c,0 0 40px #ff007f33;--tw-shadow-colored:0 20px 60px var(--tw-shadow-color),0 0 40px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-sm{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.ring-1{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-white\/10{--tw-ring-color:#ffffff1a}.blur-\[140px\]{--tw-blur:blur(140px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-\[2px\]{--tw-backdrop-blur:blur(2px)}.backdrop-blur-\[2px\],.backdrop-blur-sm{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px)}.backdrop-blur-xl{--tw-backdrop-blur:blur(24px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.duration-500{transition-duration:.5s}.duration-700{transition-duration:.7s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.selection\:bg-\[\#ff007f\] ::-moz-selection{--tw-bg-opacity:1;background-color:rgb(255 0 127/var(--tw-bg-opacity,1))}.selection\:bg-\[\#ff007f\] ::selection{--tw-bg-opacity:1;background-color:rgb(255 0 127/var(--tw-bg-opacity,1))}.selection\:text-white ::-moz-selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\:text-white ::selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\:bg-\[\#ff007f\]::-moz-selection{--tw-bg-opacity:1;background-color:rgb(255 0 127/var(--tw-bg-opacity,1))}.selection\:bg-\[\#ff007f\]::selection{--tw-bg-opacity:1;background-color:rgb(255 0 127/var(--tw-bg-opacity,1))}.selection\:text-white::-moz-selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.selection\:text-white::selection{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.hover\:-translate-y-1\.5:hover{--tw-translate-y:-0.375rem}.hover\:-translate-y-1\.5:hover,.hover\:scale-105:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\:scale-105:hover{--tw-scale-x:1.05;--tw-scale-y:1.05}.hover\:scale-\[1\.01\]:hover{--tw-scale-x:1.01;--tw-scale-y:1.01}.hover\:scale-\[1\.01\]:hover,.hover\:scale-\[1\.02\]:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\:scale-\[1\.02\]:hover{--tw-scale-x:1.02;--tw-scale-y:1.02}.hover\:border-\[\#25D366\]:hover{--tw-border-opacity:1;border-color:rgb(37 211 102/var(--tw-border-opacity,1))}.hover\:border-\[\#ff007f\]\/50:hover{border-color:#ff007f80}.hover\:border-\[\#ff4a8d\]\/60:hover{border-color:#ff4a8d99}.hover\:border-pink-500\/60:hover{border-color:#ec489999}.hover\:bg-\[\#181820\]:hover{--tw-bg-opacity:1;background-color:rgb(24 24 32/var(--tw-bg-opacity,1))}.hover\:bg-\[\#25242d\]:hover{--tw-bg-opacity:1;background-color:rgb(37 36 45/var(--tw-bg-opacity,1))}.hover\:bg-\[\#d5f9d8\]:hover{--tw-bg-opacity:1;background-color:rgb(213 249 216/var(--tw-bg-opacity,1))}.hover\:text-\[\#015f8a\]:hover{--tw-text-opacity:1;color:rgb(1 95 138/var(--tw-text-opacity,1))}.hover\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.hover\:shadow-\[0_0_25px_rgba\(255\2c 0\2c 127\2c 0\.55\)\]:hover{--tw-shadow:0 0 25px #ff007f8c;--tw-shadow-colored:0 0 25px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_0_35px_rgba\(255\2c 0\2c 127\2c 0\.7\)\]:hover{--tw-shadow:0 0 35px #ff007fb3;--tw-shadow-colored:0 0 35px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_0_35px_rgba\(34\2c 197\2c 94\2c 0\.45\)\]:hover{--tw-shadow:0 0 35px #22c55e73;--tw-shadow-colored:0 0 35px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_0_50px_rgba\(255\2c 0\2c 127\2c 0\.4\)\]:hover{--tw-shadow:0 0 50px #ff007f66;--tw-shadow-colored:0 0 50px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_0_50px_rgba\(255\2c 0\2c 127\2c 0\.8\)\]:hover{--tw-shadow:0 0 50px #ff007fcc;--tw-shadow-colored:0 0 50px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_10px_25px_rgba\(255\2c 74\2c 141\2c 0\.2\)\]:hover{--tw-shadow:0 10px 25px #ff4a8d33;--tw-shadow-colored:0 10px 25px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\:shadow-\[0_20px_50px_rgba\(37\2c 211\2c 102\2c 0\.3\)\]:hover{--tw-shadow:0 20px 50px #25d3664d;--tw-shadow-colored:0 20px 50px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.active\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95}.active\:scale-95:active,.group:hover .group-hover\:-translate-x-1\.5{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\:-translate-x-1\.5{--tw-translate-x:-0.375rem}.group:hover .group-hover\:scale-105{--tw-scale-x:1.05;--tw-scale-y:1.05}.group:hover .group-hover\:scale-105,.group:hover .group-hover\:scale-110{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\:scale-110{--tw-scale-x:1.1;--tw-scale-y:1.1}.group:hover .group-hover\:scale-\[1\.04\]{--tw-scale-x:1.04;--tw-scale-y:1.04;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\:text-\[\#ff4a8d\]{--tw-text-opacity:1;color:rgb(255 74 141/var(--tw-text-opacity,1))}.group:hover .group-hover\:opacity-100{opacity:1}@media (min-width:640px){.sm\:inline-flex{display:inline-flex}.sm\:w-auto{width:auto}.sm\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\:gap-4{gap:1rem}.sm\:gap-5{gap:1.25rem}.sm\:p-12{padding:3rem}.sm\:px-8{padding-left:2rem;padding-right:2rem}.sm\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\:text-3xl{font-size:1.875rem;line-height:2.25rem}.sm\:text-4xl{font-size:2.25rem;line-height:2.5rem}.sm\:text-8xl{font-size:6rem;line-height:1}.sm\:text-\[13px\]{font-size:13px}.sm\:text-base{font-size:1rem;line-height:1.5rem}.sm\:text-lg{font-size:1.125rem;line-height:1.75rem}.sm\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:768px){.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:col-span-5{grid-column:span 5/span 5}.lg\:col-span-7{grid-column:span 7/span 7}.lg\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.lg\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.lg\:justify-end{justify-content:flex-end}.lg\:gap-12{gap:3rem}.lg\:text-\[42px\]{font-size:42px}.lg\:text-xl{font-size:1.25rem;line-height:1.75rem}}</style>
</head>
<body class="bg-[#0e0e10] text-[#e5e1e4] antialiased selection:bg-[#ff007f] selection:text-white" data-new-gr-c-s-loaded="14.1348.0" data-new-gr-c-s-check-loaded="14.1348.0" data-gr-ext-installed="">
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
</h1><div class="w-full text-right mt-2 mb-2"><span class="block font-bold text-[#c7c2c7] tracking-tight leading-tight" style="font-size: clamp(18px, 2.5vw, 30px);">רוצה להפסיק לפספס לקוחות?</span></div>
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
<div class="flex flex-row items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base font-medium text-[#c7c2c7] pt-2 w-full max-w-[480px] whitespace-nowrap"><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>הקמה ב-5 דקות</span></div><span class="text-[#4a4750] shrink-0">•</span><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>ביטול עצמי בכל רגע</span></div><span class="text-[#4a4750] shrink-0">•</span><div class="inline-flex items-center gap-1.5 shrink-0"><span class="text-[#22C55E] font-bold text-base sm:text-lg">✓</span><span>ללא התחייבות</span></div></div>
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
<h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">נסה בעצמך - דבר עם דנה עכשיו:</h2>

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
