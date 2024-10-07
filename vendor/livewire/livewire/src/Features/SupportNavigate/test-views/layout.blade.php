<html>
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3TJDKCW5TP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3TJDKCW5TP');
</script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="/test-navigate-asset.js?v=123"></script>
</head>
<body>
    {{ $slot }}

    @stack('scripts')
</body>
</html>


