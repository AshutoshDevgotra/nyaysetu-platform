'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebaseConfig';
import { collection, doc, onSnapshot, runTransaction, serverTimestamp } from 'firebase/firestore';
import { Loader2, CheckCircle, Users, Briefcase, TrendingUp } from 'lucide-react';

type Role = 'user' | 'advocate' | 'investor';

interface Counts {
    user: number;
    advocate: number;
    investor: number;
}

export default function Waitlist() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Role>('user');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [counts, setCounts] = useState<Counts>({ user: 0, advocate: 0, investor: 0 });

    useEffect(() => {
        if (!db) return;
        const unsub = onSnapshot(doc(db, 'waitlist_stats', 'counts'), (doc) => {
            if (doc.exists()) {
                setCounts(doc.data() as Counts);
            }
        });
        return () => unsub();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !db) return;

        setLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            await runTransaction(db, async (transaction) => {
                const statsRef = doc(db!, 'waitlist_stats', 'counts');
                const entryRef = doc(collection(db!, 'waitlist_entries'));

                const statsDoc = await transaction.get(statsRef);
                let newCounts = statsDoc.exists() ? statsDoc.data() as Counts : { user: 0, advocate: 0, investor: 0 };

                newCounts[role] = (newCounts[role] || 0) + 1;

                transaction.set(statsRef, newCounts);
                transaction.set(entryRef, {
                    email,
                    role,
                    timestamp: serverTimestamp(),
                });
            });

            setStatus('success');
            setMessage("You've been added to the waitlist!");
            setEmail('');
        } catch (error) {
            console.error("Error joining waitlist:", error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    } as const;

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 font-sans text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#F2D3A3]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#F2D3A3]/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left Column: Content & Stats */}
                <div className="space-y-8">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-[#F2D3A3]">
                            NyayaDwaar
                        </h1>
                        <p className="text-xl text-[#EAD8C0] leading-relaxed">
                            The future of legal access is here. Join the revolution connecting Advocates, Users, and Investors in one seamless ecosystem.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
                        <StatCard
                            icon={<Users className="w-5 h-5 text-[#F2D3A3]" />}
                            label="Users"
                            count={counts.user}
                        />
                        <StatCard
                            icon={<Briefcase className="w-5 h-5 text-[#F2D3A3]" />}
                            label="Advocates"
                            count={counts.advocate}
                        />
                        <StatCard
                            icon={<TrendingUp className="w-5 h-5 text-[#F2D3A3]" />}
                            label="Investors"
                            count={counts.investor}
                        />
                    </motion.div>
                </div>

                {/* Right Column: Form */}
                <motion.div variants={itemVariants}>
                    <div className="bg-[#1a1a1a] border border-[#F2D3A3]/20 p-8 rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Join the Waitlist</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[#EAD8C0] mb-1">I am a...</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <RoleButton
                                        current={role}
                                        value="user"
                                        label="User"
                                        onClick={() => setRole('user')}
                                    />
                                    <RoleButton
                                        current={role}
                                        value="advocate"
                                        label="Advocate"
                                        onClick={() => setRole('advocate')}
                                    />
                                    <RoleButton
                                        current={role}
                                        value="investor"
                                        label="Investor"
                                        onClick={() => setRole('investor')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#EAD8C0] mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2D3A3] transition-all text-white placeholder-[#666]"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#F2D3A3] hover:bg-[#F8E7CC] text-[#0f0f0f] font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join Now'}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {message}
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg"
                                >
                                    {message}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

function StatCard({ icon, label, count }: { icon: React.ReactNode, label: string, count: number }) {
    return (
        <div className="bg-[#1a1a1a] border border-[#F2D3A3]/10 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#252525] transition-colors">
            <div className="mb-2 p-2 bg-[#F2D3A3]/10 rounded-full">{icon}</div>
            <div className="text-2xl font-bold tabular-nums text-white">{count.toLocaleString()}</div>
            <div className="text-xs text-[#EAD8C0] uppercase tracking-wider">{label}</div>
        </div>
    );
}

function RoleButton({ current, value, label, onClick }: { current: Role, value: Role, label: string, onClick: () => void }) {
    const isActive = current === value;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${isActive
                ? 'bg-[#F2D3A3] border-[#F2D3A3] text-[#0f0f0f] shadow-lg shadow-[#F2D3A3]/20'
                : 'bg-[#1a1a1a] border-[#333] text-[#EAD8C0] hover:bg-[#252525] hover:text-white'
                }`}
        >
            {label}
        </button>
    );
}
