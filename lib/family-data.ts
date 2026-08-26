export type MemberRole = "parent" | "child";
export type MoneyDecisionType = "income" | "spend" | "save" | "invest" | "interest" | "work";
export type ReviewStatus = "reviewed" | "discuss";
export type WorkTaskStatus = "open" | "submitted" | "approved";

export interface FamilyMember { id: string; name: string; role: MemberRole; color: string; balance: number; }
export interface PocketMoneyRule { id: string; memberId: string; amount: number; cadence: "Weekly" | "Monthly"; nextPayment: string; }
export interface SavingsGoal { id: string; memberId: string; title: string; target: number; saved: number; deadline: string; }
export interface MoneyDecision { id: string; memberId: string; type: MoneyDecisionType; amount: number; title: string; category: string; date: string; reviewStatus: ReviewStatus; goalId?: string; }
export interface WorkTask { id: string; memberId: string; title: string; description: string; amount: number; status: WorkTaskStatus; createdAt: string; completedAt?: string; submittedAt?: string; approvedAt?: string; rewardAmount?: number; }
export interface InterestRateChange { id: string; memberId: string; previousRate: number; newRate: number; changedAt: string; }
export interface VirtualInterestSettings { enabled: boolean; ratesByMemberId: Record<string, number>; settlementDay: number; lastAppliedMonth?: string; rateHistory: InterestRateChange[]; }
export interface FamilyProfile { name: string; currencySymbol: string; }
export interface FamilyProfileInput { name: string; currencySymbol: string; }
export interface FamilyData { members: FamilyMember[]; pocketMoneyRules: PocketMoneyRule[]; goals: SavingsGoal[]; decisions: MoneyDecision[]; workTasks: WorkTask[]; virtualInterest: VirtualInterestSettings; familyProfile: FamilyProfile; hasSeenIntro: boolean; }
export interface RecordDecisionInput { memberId: string; type: MoneyDecisionType; amount: number; title: string; category: string; goalId?: string; }
export interface VirtualInterestInput { enabled: boolean; ratesByMemberId: Record<string, number>; settlementDay: number; }

export const decisionMeta: Record<MoneyDecisionType, { label: string; color: string; softColor: string; icon: string }> = {
  income: { label: "Income", color: "#176B73", softColor: "#E4F1F0", icon: "payments" },
  spend: { label: "Spent", color: "#C15F49", softColor: "#FAE9E3", icon: "shopping-bag" },
  save: { label: "Saved", color: "#2C8C6A", softColor: "#E6F4ED", icon: "savings" },
  invest: { label: "Invested", color: "#355C9A", softColor: "#E7EDF8", icon: "trending-up" },
  interest: { label: "Interest", color: "#9A6B18", softColor: "#FFF1D7", icon: "auto-graph" },
  work: { label: "Work income", color: "#6C4A9B", softColor: "#F1ECFA", icon: "task-alt" },
};

export let currencySymbol = "HK$";
export const setCurrencySymbol = (value: string) => { const clean = value.trim().slice(0, 6); currencySymbol = clean || "HK$"; return currencySymbol; };
export const formatCurrency = (amount: number) => `${currencySymbol}${new Intl.NumberFormat("en-HK", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 }).format(amount)}`;
export const formatDate = (date: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(new Date(date));
export const formatShortDate = (date: string) => new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" }).format(new Date(date));
export const childMembers = (data: FamilyData) => data.members.filter((member) => member.role === "child");
export const monthKey = (date = new Date()) => date.toISOString().slice(0, 7);

export const calculateFamilySummary = (data: FamilyData) => {
  const children = childMembers(data); const totalSaved = children.reduce((sum, child) => sum + child.balance, 0); const goalSaved = data.goals.reduce((sum, goal) => sum + goal.saved, 0); const goalTarget = data.goals.reduce((sum, goal) => sum + goal.target, 0);
  return { totalSaved, goalSaved, goalTarget, goalProgress: goalTarget === 0 ? 0 : Math.round((goalSaved / goalTarget) * 100) };
};

export const renameChild = (data: FamilyData, memberId: string, nextName: string): FamilyData => {
  const cleanName = nextName.trim().replace(/\s+/g, " ").slice(0, 24);
  if (!cleanName) return data;
  return { ...data, members: data.members.map((member) => member.id === memberId && member.role === "child" ? { ...member, name: cleanName } : member) };
};

export const renameFamilyMember = (data: FamilyData, memberId: string, nextName: string): FamilyData => {
  const cleanName = nextName.trim().replace(/\s+/g, " ").slice(0, 24);
  if (!cleanName) return data;
  return { ...data, members: data.members.map((member) => member.id === memberId ? { ...member, name: cleanName } : member) };
};

export const updateFamilyProfile = (data: FamilyData, input: FamilyProfileInput): FamilyData => ({ ...data, familyProfile: { name: input.name.trim().replace(/\s+/g, " ").slice(0, 32) || "Our family", currencySymbol: input.currencySymbol.trim().slice(0, 6) || "HK$" } });

export const calculateMonthlyProgress = (data: FamilyData, date = new Date()) => {
  const key = monthKey(date); const decisions = data.decisions.filter((decision) => decision.date.startsWith(key)); const approvedTasks = data.workTasks.filter((task) => task.status === "approved" && (task.approvedAt ?? task.completedAt ?? task.createdAt).startsWith(key));
  const earnings = decisions.filter((decision) => ["income", "work", "interest"].includes(decision.type)).reduce((sum, decision) => sum + decision.amount, 0); const saved = decisions.filter((decision) => decision.type === "save").reduce((sum, decision) => sum + decision.amount, 0); const spent = decisions.filter((decision) => decision.type === "spend").reduce((sum, decision) => sum + decision.amount, 0);
  return { month: new Intl.DateTimeFormat("en-HK", { month: "long", year: "numeric" }).format(date), earnings: Math.round(earnings * 100) / 100, saved: Math.round(saved * 100) / 100, spent: Math.round(spent * 100) / 100, decisionsCount: decisions.length, approvedTaskCount: approvedTasks.length, children: childMembers(data).map((child) => { const childDecisions = decisions.filter((decision) => decision.memberId === child.id); return { member: child, earned: childDecisions.filter((decision) => ["income", "work", "interest"].includes(decision.type)).reduce((sum, decision) => sum + decision.amount, 0), saved: childDecisions.filter((decision) => decision.type === "save").reduce((sum, decision) => sum + decision.amount, 0), tasksDone: approvedTasks.filter((task) => task.memberId === child.id).length, choices: childDecisions.length }; }) };
};

export const applyDecision = (data: FamilyData, input: RecordDecisionInput): FamilyData => {
  const amount = Math.round(input.amount * 100) / 100; const balanceChange = input.type === "income" || input.type === "work" ? amount : input.type === "spend" ? -amount : 0;
  const decision: MoneyDecision = { id: `decision-${Date.now()}-${Math.round(Math.random() * 100000)}`, memberId: input.memberId, type: input.type, amount, title: input.title.trim() || decisionMeta[input.type].label, category: input.category.trim() || "Everyday money", date: new Date().toISOString(), reviewStatus: "reviewed", goalId: input.goalId };
  return { ...data, members: data.members.map((member) => member.id === input.memberId ? { ...member, balance: Math.max(0, Math.round((member.balance + balanceChange) * 100) / 100) } : member), goals: input.type === "save" && input.goalId ? data.goals.map((goal) => goal.id === input.goalId ? { ...goal, saved: Math.min(goal.target, Math.round((goal.saved + amount) * 100) / 100) } : goal) : data.goals, decisions: [decision, ...data.decisions] };
};

export const recordPocketMoneyPayment = (data: FamilyData, ruleId: string): FamilyData => {
  const rule = data.pocketMoneyRules.find((item) => item.id === ruleId); if (!rule) return data;
  const afterPayment = applyDecision(data, { memberId: rule.memberId, type: "income", amount: rule.amount, title: `${rule.cadence} pocket money`, category: "Pocket money" }); const nextPayment = new Date(rule.nextPayment); nextPayment.setDate(nextPayment.getDate() + (rule.cadence === "Weekly" ? 7 : 30));
  return { ...afterPayment, pocketMoneyRules: afterPayment.pocketMoneyRules.map((item) => item.id === ruleId ? { ...item, nextPayment: nextPayment.toISOString() } : item) };
};

export const interestRateForMember = (data: FamilyData, memberId: string) => data.virtualInterest.ratesByMemberId[memberId] ?? 0;
export const calculateVirtualInterestPayments = (data: FamilyData) => !data.virtualInterest.enabled ? [] : childMembers(data).map((member) => { const rate = interestRateForMember(data, member.id); return { memberId: member.id, rate, amount: Math.round(member.balance * (rate / 100) * 100) / 100 }; }).filter((payment) => payment.amount > 0);
export const isMonthlySettlementDue = (data: FamilyData, date = new Date()) => data.virtualInterest.enabled && date.getDate() >= data.virtualInterest.settlementDay && data.virtualInterest.lastAppliedMonth !== monthKey(date);

export const updateVirtualInterest = (data: FamilyData, settings: VirtualInterestInput, changedAt = new Date()): FamilyData => {
  const ratesByMemberId = Object.fromEntries(childMembers(data).map((member) => [member.id, Math.max(0, Math.min(20, Math.round((settings.ratesByMemberId[member.id] ?? 0) * 100) / 100))]));
  const rateHistory = [...data.virtualInterest.rateHistory, ...childMembers(data).flatMap((member) => { const previousRate = interestRateForMember(data, member.id); const newRate = ratesByMemberId[member.id]; return previousRate === newRate ? [] : [{ id: `rate-${changedAt.getTime()}-${member.id}`, memberId: member.id, previousRate, newRate, changedAt: changedAt.toISOString() }]; })];
  return { ...data, virtualInterest: { ...data.virtualInterest, enabled: settings.enabled, ratesByMemberId, settlementDay: Math.max(1, Math.min(28, Math.round(settings.settlementDay))), rateHistory } };
};

export const applyMonthlyVirtualInterest = (data: FamilyData, date = new Date()): FamilyData => {
  const currentMonth = monthKey(date); if (data.virtualInterest.lastAppliedMonth === currentMonth) return data; const payments = calculateVirtualInterestPayments(data); if (!payments.length) return data;
  return { ...data, members: data.members.map((member) => { const payment = payments.find((item) => item.memberId === member.id); return payment ? { ...member, balance: Math.round((member.balance + payment.amount) * 100) / 100 } : member; }), decisions: [...payments.map((payment) => ({ id: `interest-${currentMonth}-${payment.memberId}`, memberId: payment.memberId, type: "interest" as const, amount: payment.amount, title: "Virtual interest from Mum & Dad", category: `${payment.rate}% monthly`, date: date.toISOString(), reviewStatus: "reviewed" as const })), ...data.decisions], virtualInterest: { ...data.virtualInterest, lastAppliedMonth: currentMonth } };
};
export const applyDueVirtualInterest = (data: FamilyData, date = new Date()) => isMonthlySettlementDue(data, date) ? applyMonthlyVirtualInterest(data, date) : data;

export const createWorkTask = (data: FamilyData, input: Pick<WorkTask, "memberId" | "title" | "description" | "amount">, date = new Date()): FamilyData => ({ ...data, workTasks: [{ id: `work-${date.getTime()}-${Math.round(Math.random() * 100000)}`, ...input, amount: Math.max(0, Math.round(input.amount * 100) / 100), status: "open", createdAt: date.toISOString() }, ...data.workTasks] });
export const completionDayKey = (date: string) => date.slice(0, 10);
export const calculateCompletionStreak = (tasks: WorkTask[], memberId: string, referenceDate = new Date()) => {
  const completedDays = new Set(tasks.filter((task) => task.memberId === memberId && task.status === "approved" && task.completedAt).map((task) => completionDayKey(task.completedAt as string)));
  let cursor = new Date(referenceDate); let count = 0;
  while (completedDays.has(cursor.toISOString().slice(0, 10))) { count += 1; cursor.setUTCDate(cursor.getUTCDate() - 1); }
  return count;
};
export const streakRewardFor = (streak: number) => streak > 0 && streak % 3 === 0 ? 2 : 0;
export const submitWorkTask = (data: FamilyData, taskId: string, date = new Date()): FamilyData => ({ ...data, workTasks: data.workTasks.map((task) => task.id === taskId && task.status === "open" ? { ...task, status: "submitted", completedAt: date.toISOString(), submittedAt: date.toISOString() } : task) });
export const approveWorkTask = (data: FamilyData, taskId: string, date = new Date()): FamilyData => { const task = data.workTasks.find((item) => item.id === taskId); if (!task || task.status !== "submitted") return data; const approvalDate = date.toISOString(); const completedAt = task.completedAt ?? approvalDate; const taskForStreak = { ...task, status: "approved" as const, completedAt }; const previousTasks = data.workTasks.filter((item) => item.id !== task.id); const streak = calculateCompletionStreak([...previousTasks, taskForStreak], task.memberId, new Date(completedAt)); const rewardAmount = streakRewardFor(streak); const withBaseIncome = applyDecision(data, { memberId: task.memberId, type: "work", amount: task.amount, title: task.title, category: "Work task" }); const withBonus = rewardAmount > 0 ? applyDecision(withBaseIncome, { memberId: task.memberId, type: "work", amount: rewardAmount, title: `${streak}-day effort streak reward`, category: "Streak reward" }) : withBaseIncome; return { ...withBonus, workTasks: withBonus.workTasks.map((item) => item.id === taskId ? { ...item, status: "approved", completedAt, approvedAt: approvalDate, rewardAmount } : item) }; };

export const initialFamilyData: FamilyData = {
  hasSeenIntro: false,
  familyProfile: { name: "Our family", currencySymbol: "HK$" },
  members: [{ id: "sarah", name: "Sarah", role: "parent", color: "#176B73", balance: 0 }, { id: "alex", name: "Alex", role: "parent", color: "#355C9A", balance: 0 }, { id: "mia", name: "Mia", role: "child", color: "#E98163", balance: 320 }, { id: "theo", name: "Theo", role: "child", color: "#7761B8", balance: 465 }],
  virtualInterest: { enabled: true, ratesByMemberId: { mia: 1, theo: 1 }, settlementDay: 1, rateHistory: [] },
  pocketMoneyRules: [{ id: "mia-weekly", memberId: "mia", amount: 12, cadence: "Weekly", nextPayment: "2026-08-28T09:00:00.000Z" }, { id: "theo-weekly", memberId: "theo", amount: 15, cadence: "Weekly", nextPayment: "2026-08-28T09:00:00.000Z" }],
  goals: [{ id: "mia-art", memberId: "mia", title: "Art set", target: 160, saved: 112, deadline: "2026-10-01T09:00:00.000Z" }, { id: "theo-bike", memberId: "theo", title: "New bike", target: 520, saved: 305, deadline: "2026-12-18T09:00:00.000Z" }],
  workTasks: [{ id: "work-1", memberId: "mia", title: "Sort the recycling", description: "Separate paper, plastic and glass safely.", amount: 3, status: "open", createdAt: "2026-08-25T09:00:00.000Z" }, { id: "work-2", memberId: "theo", title: "Wash the bikes", description: "Help get the bikes ready for the weekend.", amount: 4, status: "submitted", createdAt: "2026-08-24T09:00:00.000Z", completedAt: "2026-08-25T17:00:00.000Z" }],
  decisions: [{ id: "d-4", memberId: "theo", type: "invest", amount: 35, title: "Junior investment pot", category: "Long-term", date: "2026-08-23T09:00:00.000Z", reviewStatus: "discuss" }, { id: "d-3", memberId: "mia", type: "save", amount: 18, title: "Put aside for art set", category: "Goal", date: "2026-08-22T09:00:00.000Z", reviewStatus: "reviewed", goalId: "mia-art" }, { id: "d-2", memberId: "theo", type: "spend", amount: 12, title: "Bookshop visit", category: "Learning", date: "2026-08-21T09:00:00.000Z", reviewStatus: "reviewed" }, { id: "d-1", memberId: "mia", type: "income", amount: 12, title: "Weekly pocket money", category: "Pocket money", date: "2026-08-21T09:00:00.000Z", reviewStatus: "reviewed" }],
};
