{{-- resources/views/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparepart Shop</title>
    @if (app()->environment('local'))
        {{-- Development: Load from Vite dev server --}}
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/resources/js/app.js"></script>
    @else
        {{-- Production: Load built assets --}}
        <script type="module" src="{{ asset('build/assets/app.js') }}"></script>
        <link rel="stylesheet" href="{{ asset('build/assets/app.css') }}">
    @endif
</head>
<body>
    <div id="app"></div>  {{-- Vue controls everything from here --}}

    {{-- bootstrap here --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>