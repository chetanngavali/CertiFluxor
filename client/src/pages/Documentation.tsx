import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ChevronRight, Book, Key, Webhook, Code, Terminal, FileText, Settings, Download, FileSpreadsheet, ShieldCheck, Code2 } from "lucide-react";
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
                                    <button
                                        onClick={() => setActiveSection("authentication")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "authentication" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Key className="h-4 w-4" /> Authentication
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("cli")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "cli" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Terminal className="h-4 w-4" /> CLI Tool
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Core Concepts</h4>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => setActiveSection("templates")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "templates" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <FileText className="h-4 w-4" /> Templates
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("variables")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "variables" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Code className="h-4 w-4" /> Dynamic Variables
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("excel")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "excel" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <FileSpreadsheet className="h-4 w-4" /> Excel Engine
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("verification")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "verification" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <ShieldCheck className="h-4 w-4" /> Verification
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("domains")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "domains" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Settings className="h-4 w-4" /> Custom Domains
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">API Reference</h4>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => setActiveSection("sdks")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "sdks" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Code2 className="h-4 w-4" /> SDKs
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("webhooks")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "webhooks" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
                                        <Webhook className="h-4 w-4" /> Webhooks
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveSection("export")}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === "export" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                                    >
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
                        {activeSection === "quickstart" && (
                            <>
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
                            </>
                        )}

                        {activeSection === "authentication" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Getting Started <ChevronRight className="h-4 w-4" /> Authentication
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Authentication</h1>
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
                                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-900 text-sm font-medium">
                                    <strong>Warning:</strong> Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
                                </div>
                            </>
                        )}

                        {activeSection === "cli" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Getting Started <ChevronRight className="h-4 w-4" /> CLI Tool
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Command Line Interface</h1>
                                <p className="mb-6 text-slate-600 font-medium">The CertiFluxor CLI helps you manage templates and generate certificates directly from your terminal. It's perfect for CI/CD pipelines.</p>

                                <h3 className="text-xl font-bold text-slate-900 mb-4">Installation</h3>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm mb-8">
                                    npm install -g certifluxor-cli
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-4">Basic Usage</h3>
                                <p className="mb-4 text-slate-600">Initialize a new project in your current directory:</p>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm mb-8">
                                    certifluxor init
                                </div>

                                <p className="mb-4 text-slate-600">Generate certificates from a CSV file:</p>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm mb-8">
                                    certifluxor generate --template tpl_xyz --input recipients.csv --out ./dist
                                </div>
                            </>
                        )}

                        {activeSection === "templates" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Core Concepts <ChevronRight className="h-4 w-4" /> Templates
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Designing Templates</h1>
                                <p className="mb-6 text-slate-600 font-medium">Templates are the blueprints for your certificates. You can design them using our visual editor or write them in standard HTML/CSS.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Structure</h2>
                                <p className="mb-4 text-slate-600">A template consists of a background image (optional), layout directives, and dynamic text fields. We support standard CSS for styling.</p>

                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-900 text-sm mb-6">
                                    <strong>Tip:</strong> Use standard A4 aspect ratios (1.414:1) for best print results.
                                </div>
                            </>
                        )}

                        {activeSection === "variables" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Core Concepts <ChevronRight className="h-4 w-4" /> Dynamic Variables
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Dynamic Variables</h1>
                                <p className="mb-6 text-slate-600 font-medium">Inject dynamic data into your certificates using Mustache-like syntax.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Supported Types</h2>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                                    <li><strong>Text:</strong> {"{{recipient.name}}"} - Renders plain text.</li>
                                    <li><strong>Dates:</strong> {"{{date | format: 'MM/DD/YYYY'}}"} - Formats dates automatically.</li>
                                    <li><strong>QR Codes:</strong> {"{{qr:verification_url}}"} - Generates a scannable QR code.</li>
                                    <li><strong>Images:</strong> {"{{img:signature_url}}"} - Embeds an image from a URL.</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Example JSON Payload</h2>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm">
                                    <pre>
                                        {`{
  "template_id": "tpl_mastery_2026",
  "data": {
    "recipient": {
      "name": "Alex Morgan",
      "course": "Enterprise Systems"
    },
    "instructor": {
      "sign": "https://...",
      "name": "Dr. Smith"
    }
  }
}`}
                                    </pre>
                                </div>
                            </>
                        )}

                        {activeSection === "domains" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Core Concepts <ChevronRight className="h-4 w-4" /> Custom Domains
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Custom Domains</h1>
                                <p className="mb-6 text-slate-600 font-medium">Serve your certificates from your own domain (e.g., credentials.yourcompany.com) for a white-labeled experience.</p>

                                <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-8">
                                    <li>Go to <strong>Settings {">"} Domains</strong> in your dashboard.</li>
                                    <li>Add your domain name (e.g., <code>certs.example.com</code>).</li>
                                    <li>Add the CNAME record provided by CertiFluxor to your DNS provider.</li>
                                    <li>Wait for SSL verification (usually 5-10 minutes).</li>
                                </ol>

                                <p className="text-slate-600">Once verified, all public certificate URLs will be served from your custom domain.</p>
                            </>
                        )}

                        {activeSection === "webhooks" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    API Reference <ChevronRight className="h-4 w-4" /> Webhooks
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Webhooks</h1>
                                <p className="mb-6 text-slate-600 font-medium">Listen for events on your server to trigger actions when certificates are generated or delivered.</p>

                                <h3 className="text-xl font-bold text-slate-900 mb-4">Events</h3>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                                    <li><code>certificate.created</code> - Fired when generation is complete.</li>
                                    <li><code>email.delivered</code> - Fired when the recipient opens the email.</li>
                                    <li><code>certificate.verified</code> - Fired when the QR code is scanned.</li>
                                </ul>

                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm">
                                    <pre>
                                        {`POST /your-webhook-endpoint
{
  "event": "certificate.created",
  "data": {
    "id": "crt_829301",
    "url": "https://certs.example.com/verify/..."
  },
  "timestamp": 1678290123
}`}
                                    </pre>
                                </div>
                            </>
                        )}

                        {activeSection === "export" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    API Reference <ChevronRight className="h-4 w-4" /> Export
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Export & Download</h1>
                                <p className="mb-6 text-slate-600 font-medium">Download generated certificates in various formats.</p>

                                <h3 className="text-xl font-bold text-slate-900 mb-4">GET /v1/certificates/:id/pdf</h3>
                                <p className="mb-4 text-slate-600">Returns the binary PDF file stream. Suitable for direct download or archival.</p>

                                <h3 className="text-xl font-bold text-slate-900 mb-4">GET /v1/certificates/:id/png</h3>
                                <p className="mb-4 text-slate-600">Returns a high-resolution PNG image of the certificate, useful for social media sharing previews.</p>
                            </>
                        )}

                        {activeSection === "excel" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Core Concepts <ChevronRight className="h-4 w-4" /> Excel Engine
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Excel Engine</h1>
                                <p className="mb-6 text-slate-600 font-medium">Batch generate thousands of certificates by uploading a single spreadsheet file.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
                                <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-8">
                                    <li>Prepare your data in CSV, XLSX, or Google Sheets format.</li>
                                    <li>Ensure header rows match your template variable names (e.g., column "Name" maps to <code>{"{{Name}}"}</code>).</li>
                                    <li>Upload the file via the Dashboard or API.</li>
                                    <li>CertiFluxor processes the file row-by-row, generating a certificate for each entry.</li>
                                </ol>

                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-900 text-sm mb-6">
                                    <strong>Performance:</strong> Our engine can process up to 10,000 rows per minute.
                                </div>
                            </>
                        )}

                        {activeSection === "verification" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    Core Concepts <ChevronRight className="h-4 w-4" /> Verification
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Verification System</h1>
                                <p className="mb-6 text-slate-600 font-medium">Ensure the authenticity of every credential issued through our hosted verification pages.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">QR Codes</h2>
                                <p className="mb-4 text-slate-600">Embed a unique QR code in your template using <code>{"{{qr:verify}}"}</code>. When scanned, it leads to a secure, branded verification page hosted by CertiFluxor.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Blockchain Security</h2>
                                <p className="mb-4 text-slate-600">For enterprise plans, we anchor certificate hashes to the Polygon blockchain, providing immutable proof of issuance existence and time.</p>
                            </>
                        )}

                        {activeSection === "sdks" && (
                            <>
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                                    API Reference <ChevronRight className="h-4 w-4" /> SDKs
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Official SDKs</h1>
                                <p className="mb-6 text-slate-600 font-medium">Accelerate your integration with our official client libraries.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-[#333] text-white p-2 rounded">JS</div>
                                            <h3 className="font-bold text-slate-900">Node.js</h3>
                                        </div>
                                        <code className="bg-slate-100 block p-2 rounded text-xs">npm install @certifluxor/node</code>
                                    </div>
                                    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-[#3776AB] text-white p-2 rounded">PY</div>
                                            <h3 className="font-bold text-slate-900">Python</h3>
                                        </div>
                                        <code className="bg-slate-100 block p-2 rounded text-xs">pip install certifluxor</code>
                                    </div>
                                    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-[#777BB4] text-white p-2 rounded">PHP</div>
                                            <h3 className="font-bold text-slate-900">PHP</h3>
                                        </div>
                                        <code className="bg-slate-100 block p-2 rounded text-xs">composer require certifluxor/php</code>
                                    </div>
                                    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-[#00ADD8] text-white p-2 rounded">GO</div>
                                            <h3 className="font-bold text-slate-900">Go</h3>
                                        </div>
                                        <code className="bg-slate-100 block p-2 rounded text-xs">go get github.com/certifluxor/go</code>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
