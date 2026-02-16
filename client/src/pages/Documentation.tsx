import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ChevronRight, Book, Key, Webhook, Code, Terminal, FileText, Settings, Download } from "lucide-react";
import { useState } from "react";

export default function Documentation() {
    const [activeSection, setActiveSection] = useState("quickstart");

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 h-14 flex items-center">
                <div className="container flex items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight uppercase">
                            CertiFluxor <span className="text-slate-400 font-medium normal-case ml-1 tracking-normal">/ Docs</span>
                        </Link>
                        <div className="hidden md:flex relative">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="pl-9 pr-4 py-1.5 bg-slate-100 rounded-md text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/auth?mode=register">
                            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 font-bold h-8 rounded-md text-xs">Get API Keys</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 container mx-auto px-4 sm:px-8 flex">
                {/* Sidebar */}
                <aside className="w-64 py-8 hidden md:block border-r border-slate-100 pr-8 overflow-y-auto h-[calc(100vh-56px)] sticky top-14">
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Getting Started</h4>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => setActiveSection("quickstart")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "quickstart" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Book className="h-4 w-4" /> Quickstart Guide
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Key className="h-4 w-4" /> Authentication
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Terminal className="h-4 w-4" /> CLI Tool
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Core Concepts</h4>
                            <ul className="space-y-1">
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <FileText className="h-4 w-4" /> Templates
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Code className="h-4 w-4" /> Dynamic Variables
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Settings className="h-4 w-4" /> Custom Domains
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">API Reference</h4>
                            <ul className="space-y-1">
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Webhook className="h-4 w-4" /> Webhooks
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Download className="h-4 w-4" /> Export Endpoints
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 py-12 md:pl-12 max-w-4xl">
                    <div className="prose prose-slate max-w-none">
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                            Getting Started <ChevronRight className="h-4 w-4" /> Introduction
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">CertiFluxor API Overview</h1>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                            CertiFluxor is a developer-first platform for programmatically generating PDF certificates from JSON data or CSV files.
                        </p>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-slate-500" />
                                Base URL
                            </h3>
                            <code className="bg-slate-900 text-green-400 p-3 rounded-lg block w-full font-mono text-sm shadow-inner">
                                https://api.fluxcert.com/v1
                            </code>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Authentication</h2>
                        <p className="mb-4 text-slate-600 font-medium">CertiFluxor uses API keys to allow access to the API. You can register a new API key at our <Link href="/auth?mode=register" className="text-blue-600 hover:underline">developer portal</Link>.</p>

                        <p className="mb-6 text-slate-600 font-medium">CertiFluxor expects for the API key to be included in all API requests to the server in a header that looks like the following:</p>

                        <div className="bg-[#0d1117] rounded-xl overflow-hidden shadow-xl mb-12 border border-slate-800">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                                <span className="text-xs font-bold text-slate-400">cURL</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                            </div>
                            <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto">
                                <code>{`curl https://api.fluxcert.com/v1/certificates \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_id": "tpl_123",
    "recipient": { "name": "John Doe" }
  }'`}</code>
                            </pre>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Error Codes</h2>
                        <div className="overflow-hidden border border-slate-200 rounded-xl">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Code</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 font-bold">200 OK</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">Everything worked as expected.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 font-bold">400 Bad Request</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">The request was unacceptable, often due to missing a required parameter.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 font-bold">401 Unauthorized</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">No valid API key provided.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 font-bold">402 Request Failed</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">Parameters were valid but the request failed (e.g. template not found).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
