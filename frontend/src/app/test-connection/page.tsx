'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '../../lib/api';
import { CheckCircle2, XCircle, RefreshCw, ArrowLeft, Server, Activity, Clock, ShieldCheck } from 'lucide-react';

interface HealthResponse {
  status: string;
  message: string;
}

export default function TestConnectionPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const result = await api.get<HealthResponse>('/health/');
      const duration = Math.round(performance.now() - startTime);
      setData(result);
      setResponseTime(duration);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - startTime);
      setResponseTime(duration);
      setLastChecked(new Date().toLocaleTimeString());
      if (err instanceof ApiError) {
        setError(`Backend Error (${err.status}): ${err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to backend server');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Frontend ↔ Backend Diagnostic</h1>
              <p className="text-xs text-slate-400">Next.js App Router to Django REST API</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to App
          </Link>
        </div>

        {/* Target Details */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Target Endpoint:
            </span>
            <code className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
              {apiUrl}/health/
            </code>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Auth Integration:
            </span>
            <span className="text-slate-300">SimpleJWT & Bearer Token Client Ready</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            ) : error ? (
              <XCircle className="w-6 h-6 text-rose-500" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            )}
            <div>
              <p className="text-sm font-semibold">
                {loading
                  ? 'Connecting to Django...'
                  : error
                  ? 'Connection Failed'
                  : 'Connection Successful'}
              </p>
              <p className="text-xs text-slate-400">
                {lastChecked ? `Last ping: ${lastChecked}` : 'Initializing test...'}
              </p>
            </div>
          </div>
          {responseTime !== null && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/40">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{responseTime}ms</span>
            </div>
          )}
        </div>

        {/* Response Box */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 block uppercase tracking-wider">
            API Response
          </label>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto min-h-[100px] flex items-center justify-center">
            {loading ? (
              <p className="text-slate-500 italic">Awaiting response from Django server...</p>
            ) : error ? (
              <p className="text-rose-400 font-semibold">{error}</p>
            ) : (
              <pre className="text-emerald-400 w-full">{JSON.stringify(data, null, 2)}</pre>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Testing...' : 'Re-test Connection'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
