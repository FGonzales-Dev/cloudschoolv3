<!DOCTYPE html>

<html lang="{{ App::getLocale() }}" dir="ltr"
    class="{{ \Illuminate\Support\Facades\Cookie::get('theme_preference') }}">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3TJDKCW5TP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-3TJDKCW5TP');
    </script>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Favicon icon -->
    @include('gateway::partial.favicon')
    <title>{{ __('Gateway') }}</title>
    <link href="{{ asset('Modules/Gateway/Resources/assets/css/bootstrap.min.css') }}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('Modules/Gateway/Resources/assets/css/gateway.min.css') }}">
    @yield('css')
</head>

<body>
    <section class="card1">
        <div class="payment-loader">
            <div class="sp sp-circle"></div>
        </div>
        <div class="svg-1">
            @include('gateway::partial.logo')
        </div>
        <p class="text-color-14 dark:text-white text-24 font-medium font-Figtree break-words">{{ $packageName }}</p>

        <p class="para-1">{{ __('Amount to be paid') }}</p>


        <p class="text-36 font-medium font-RedHat text-color-14 dark:text-white mt-1">

            <span class="text-48 font-bold break-all">{{ formatNumber($purchaseData->total) }}</span>

            <span class="text-18">/ {{ ucfirst($purchaseData->sending_details->billing_cycle) }}</span>
        </p>





        <p class="para-1">{{ __('currency') }}</p>
        <p class="para-3 para-2">{{ $purchaseData->currency_code }}</p>
        <p class="para-6">Please Review And Confirm Subscription Plan</p>
        <div class="straight-line"></div>

        <div>
            @include('gateway::partial.errors')
            <div class="test justify-content-center">
                @yield('content')
            </div>
        </div>
        <a href="#"
            class="close-payment process-prev position-relative d-flex justify-content-center align-items-center cursor-pointer return">
            <svg class="position-absolute me-3" width="11" height="7" viewBox="0 0 11 7" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.59216 0L4.6714 1.05155L2.92161 2.75644H10.2369C10.6583 2.75644 11 3.08934 11 3.5C11 3.91066 10.6583 4.24356 10.2369 4.24356H2.92161L4.6714 5.94845L3.59216 7L0 3.5L3.59216 0Z"
                    fill="currentColor"></path>
            </svg>
            <p class="prev mb-0">{{ __('Close') }}</p>
        </a>
    </section>
    <script>
        var response = {
            status: "failed",
            message: "{{ __('Payment cancelled.') }}"
        }
    </script>
    <script src="{{ asset('Modules/Gateway/Resources/assets/js/jquery.min.js') }}"></script>
    <script src="{{ asset('Modules/Gateway/Resources/assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('Modules/Gateway/Resources/assets/js/app.min.js') }}"></script>
    @yield('js')
</body>

</html>
