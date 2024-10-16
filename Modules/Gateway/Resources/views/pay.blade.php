@extends('gateway::layouts.master')

@section('content')
    @forelse ($gateways as $gateway)
        <a href="{{ route('gateway.pay', withOldQueryIntegrity(['gateway' => $gateway->alias])) }}" class="pay-box">
            <button type="submit"
                class="mt-[34px] text-white dark:text-color-14 text-16 font-semibold py-[13px] px-8 rounded-lg bg-color-14 dark:bg-white font-Figtree plan-loader flex gap-3">
                Confirm Plan</button>
        </a>



    @empty
        <a href="javascript:void(0)" onclick="history.back()" class="pay-box">
            <div class="grow">
                <h3>{{ __('No gateway found.') }}</h3>
            </div>
        </a>
    @endforelse
@endsection
