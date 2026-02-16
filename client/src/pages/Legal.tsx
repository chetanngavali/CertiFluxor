import { Link } from "wouter";

import { LogoIcon } from "@/components/ui/logo";

export default function Legal() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary selection:text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                <Link href="/">
                    <div className="flex items-center gap-2 mb-8 cursor-pointer group w-fit">
                        <LogoIcon className="h-8 w-8 shadow-sm group-hover:scale-105 transition-transform" />
                        <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">CertiFluxor</span>
                    </div>
                </Link>

                <h1 className="text-3xl font-black text-slate-900 mb-8">Terms of Service</h1>
                <div className="prose prose-slate max-w-none">
                    <p>Last updated: February 16, 2026</p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using CertiFluxor, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h3>2. Service Description</h3>
                    <p>CertiFluxor provides automated certificate generation and issuance services. We reserve the right to modify or discontinue the service at any time.</p>

                    <h3>3. User Accounts</h3>
                    <p>You are responsible for maintaining the security of your account and API keys. Any activity under your account is your responsibility.</p>

                    <h3>4. API Usage</h3>
                    <p>Abuse of the API, including excessive requests or attempts to circumvent rate limits, may result in account termination.</p>

                    <hr className="my-8" />

                    <h1 className="text-3xl font-black text-slate-900 mb-8">Privacy Policy</h1>

                    <h3>1. Data Collection</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, request customer support, or communicate with us.</p>

                    <h3>2. Recipient Data</h3>
                    <p>Data regarding certificate recipients (names, courses, grades) is processed solely for the purpose of generating certificates and is not sold to third parties.</p>

                    <h3>3. Data Retention</h3>
                    <p>We retain certificate data for as long as your account is active or as needed to provide you services, including verification services.</p>
                </div>
            </div>
        </div>
    );
}
