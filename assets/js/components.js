/* ==========================================================
   components.js — shared header, footer, CTA, newsletter + icons.
   Pages only contain placeholders such as:
     <div data-component="header"></div>
   so navigation/footer links are edited in ONE place (here).
   Works on any static host and even when opened from disk.
   ========================================================== */
(function () {
  var S = window.SITE || {};
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var PAGE = document.documentElement.getAttribute("data-page") || "";

  /* ---- icon set: Phosphor Icons (MIT licence, https://phosphoricons.com) ---- */
  var ICONS = {
      "download": "<path d=\"M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z\"/>",
      "satellite": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"14\" stroke-linecap=\"round\" stroke-linejoin=\"round\" transform=\"rotate(-45 128 128)\"><rect x=\"104\" y=\"104\" width=\"48\" height=\"48\"/><rect x=\"20\" y=\"108\" width=\"64\" height=\"40\"/><rect x=\"172\" y=\"108\" width=\"64\" height=\"40\"/><path d=\"M84 128h20M152 128h20M128 104V72\"/></g>",
      "leaf": "<path d=\"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z\"/>",
      "check": "<path d=\"M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z\"/>",
      "tick": "<path d=\"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z\"/>",
      "arrow": "<path d=\"M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z\"/>",
      "plus": "<path d=\"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z\"/>",
      "menu": "<path d=\"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z\"/>",
      "close": "<path d=\"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z\"/>",
      "chevron": "<path d=\"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z\"/>",
      "left": "<path d=\"M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z\"/>",
      "right": "<path d=\"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z\"/>",
      "mail": "<path d=\"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z\"/>",
      "phone": "<path d=\"M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z\"/>",
      "pin": "<path d=\"M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z\"/>",
      "bolt": "<path d=\"M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z\"/>",
      "bot": "<path d=\"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z\"/>",
      "chart": "<path d=\"M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z\"/>",
      "compass": "<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z\"/>",
      "shield": "<path d=\"M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z\"/>",
      "users": "<path d=\"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z\"/>",
      "star": "<path d=\"M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z\"/>",
      "facebook": "<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z\"/>",
      "instagram": "<path d=\"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z\"/>",
      "x": "<path d=\"M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z\"/>",
      "linkedin": "<path d=\"M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z\"/>",
      "youtube": "<path d=\"M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z\"/>",
      "heart": "<path d=\"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z\"/>",
      "clock": "<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z\"/>",
      "globe":"<path d=\"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z\"/>"
  };
  function icon(name, cls) {
    var body = ICONS[name] || "";
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 256 256" aria-hidden="true" focusable="false">' + body + "</svg>";
  }
  window.SiteIcon = icon;

  /* ---- navigation data ---- */
  var NAV = [
    { label: "Products", id: "products", children: [
      { label: "AI-Powered ESG Suite", href: "esg-suite.html", id: "esg-suite" },
      { label: "CLARA (Financial Analytics)", href: "clara.html", id: "clara" },
      { label: "Meridien (Starlink Monetisation)", href: "meridien.html", id: "meridien" }
    ] },
    { label: "Solutions", id: "solutions", children: [
      { label: "Private LLM Deployment", href: "private-llm.html", id: "private-llm" },
      { label: "AI Solutions Engineering", href: "ai-engineering.html", id: "ai-engineering" },
      { label: "Climate Tech with AI", href: "climate-tech.html", id: "climate-tech" }
    ] },
    { label: "Case Studies", href: "case-studies.html", id: "case-studies" },
    { label: "Insights", href: "blog.html", id: "blog" },
    { label: "Company", id: "company", children: [
      { label: "About", href: "about.html", id: "about" },
      { label: "Team", href: "about.html#team", id: "team" },
      { label: "Contact", href: "contact.html", id: "contact" }
    ] }
  ];
  var FOOT = [
    { title: "Products", links: [["AI-Powered ESG Suite", "esg-suite.html"], ["CLARA", "clara.html"], ["Meridien", "meridien.html"]] },
    { title: "Solutions", links: [["Private LLM Deployment", "private-llm.html"], ["AI Solutions Engineering", "ai-engineering.html"], ["Climate Tech with AI", "climate-tech.html"]] },
    { title: "Company", links: [["About", "about.html"], ["Team", "about.html#team"], ["Case Studies", "case-studies.html"], ["Insights", "blog.html"], ["Contact", "contact.html"]] }
  ];
  var u = function (p) { return ROOT + p; };
  function logo() {
    return '<img src="' + u("assets/img/logo.png") + '" alt="' + S.name + '" width="188" height="36">';
  }

  /* ---- templates ---- */
  function header() {
    var items = NAV.map(function (n) {
      if (n.children) {
        var open = n.children.some(function (c) { return c.id === PAGE; });
        var kids = n.children.map(function (c) {
          return '<a href="' + u(c.href) + '"' + (c.id === PAGE ? ' class="active" aria-current="page"' : "") + ">" + c.label + "</a>";
        }).join("");
        return '<div class="dropdown"><button class="nav-link' + (open ? " active" : "") + '" aria-expanded="false" aria-haspopup="true">' + n.label + icon("chevron", "icon-s") + '</button><div class="dropdown-list">' + kids + "</div></div>";
      }
      return '<a class="nav-link' + (n.id === PAGE ? " active" : "") + '" href="' + u(n.href) + '"' + (n.id === PAGE ? ' aria-current="page"' : "") + ">" + n.label + "</a>";
    }).join("");
    return '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="navbar"><div class="nav-inner">' +
      '<a class="brand" href="' + u("index.html") + '" aria-label="' + S.name + ' home">' + logo() + '</a>' +
      '<nav class="nav-menu" id="nav-menu" aria-label="Main">' + items + '<a class="btn btn-large nav-cta-mobile" href="' + u("contact.html") + '">Book a Demo</a></nav>' +
      '<div class="nav-right"><a class="btn" href="' + u("contact.html") + '">Book a Demo</a>' +
      '<button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">' + icon("menu") + "</button></div>" +
      "</div></header>";
  }

  function footer() {
    var cols = FOOT.map(function (c) {
      return "<div><h4>" + c.title + "</h4>" + c.links.map(function (l) {
        return '<a class="footer-link" href="' + u(l[1]) + '">' + l[0] + "</a>";
      }).join("") + "</div>";
    }).join("");
    var soc = ["facebook", "instagram", "x", "linkedin", "youtube"].filter(function (k) { return S.social && S.social[k]; }).map(function (k) {
      return '<a class="social" href="' + S.social[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' + icon(k) + "</a>";
    }).join("");
    return '<footer class="footer section"><div class="container tight">' +
      '<div class="footer-top"><div><a href="' + u("index.html") + '" aria-label="' + S.name + ' home">' + logo() + '</a>' +
      '<p class="t-muted mt-s" style="max-width:18rem">AI-native platforms for ESG, financial analytics and satellite connectivity, plus private AI for enterprises. Melbourne &amp; Colombo.</p></div>' + cols + "</div>" +
      '<div class="divider"></div><div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + " " + S.name + ". All rights reserved.</span>" +
      '<div class="footer-legal"><a href="' + u("privacy.html") + '">Privacy Policy</a><a href="' + u("terms.html") + '">Terms of Service</a></div>' +
      '<div class="socials">' + soc + "</div></div></div></footer>";
  }

  function cta() {
    return '<section class="section"><div class="container tight"><div class="cta-card reveal">' +
      "<div class=\"text\"><div class=\"section-title\">Let&rsquo;s work together</div>" +
      '<h2 class="h3 mb-s">Transform your business with AI</h2>' +
      '<p class="t-muted">See how ' + S.name + ' can cut your reporting time, protect your data and open new revenue.</p>' +
      '<div class="btn-wrap"><a class="btn" href="' + u("contact.html") + '">Book a Demo</a>' +
      '<a class="btn btn-secondary" href="' + u("contact.html") + '">Contact Sales</a></div></div>' +
      '<div class="pic"><img src="' + u("assets/img/cta.jpg") + '" alt="" loading="lazy"></div></div></div></section>';
  }

  function newsletter() {
    return '<section class="section bordered-top"><div class="container tight"><div class="grid grid-2">' +
      '<div class="reveal"><h3 class="h4 mb-xs">Join our newsletter</h3><p class="t-muted">Practical thinking on ESG, AI and enterprise technology, in your inbox.</p></div>' +
      '<div class="reveal"><form data-form="newsletter" novalidate><div class="form-inline">' +
      '<label class="sr-only" for="nl-email">Email address</label>' +
      '<input class="input" id="nl-email" name="email" type="email" placeholder="Enter your email" required autocomplete="email">' +
      '<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<button class="btn btn-outline" type="submit">Subscribe</button></div>' +
      '<p class="t-small t-muted mt-s">By subscribing, you agree to our <a href="' + u("privacy.html") + '" style="text-decoration:underline">Privacy Policy</a></p>' +
      '<div class="form-msg" role="status" aria-live="polite"></div></form></div></div></div></section>';
  }

  var MAP = { header: header, footer: footer, cta: cta, newsletter: newsletter };

  /* ---- mount ---- */
  document.querySelectorAll("[data-component]").forEach(function (el) {
    var fn = MAP[el.getAttribute("data-component")];
    if (fn) el.outerHTML = fn();
  });
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.outerHTML = icon(el.getAttribute("data-icon"), el.getAttribute("data-class") || "");
  });
})();
