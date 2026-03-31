import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Обзор',            icon: 'LayoutDashboard' },
  { id: 'passports',  label: 'Паспорта объектов', icon: 'FileText' },
  { id: 'nearmiss',   label: 'Почти случившиеся', icon: 'AlertTriangle' },
  { id: 'predict',    label: 'Прогнозирование',   icon: 'TrendingUp' },
  { id: 'training',   label: 'Обучение',          icon: 'GraduationCap' },
  { id: 'reports',    label: 'Отчёты',            icon: 'BarChart3' },
];

const RISK_ZONES = [
  { name: 'Цех №3 — Литьё',        risk: 82, trend: +5, incidents: 3, status: 'critical' },
  { name: 'Склад ГСМ',              risk: 67, trend: +2, incidents: 1, status: 'high' },
  { name: 'Энергоблок А',           risk: 54, trend: -8, incidents: 0, status: 'medium' },
  { name: 'Компрессорная',          risk: 41, trend: -3, incidents: 0, status: 'medium' },
  { name: 'Административный блок',  risk: 18, trend: -1, incidents: 0, status: 'low' },
];

const NEAR_MISS = [
  { id: 'NM-2024-041', date: '29.03.2026', location: 'Цех №3',       type: 'Падение предмета',        severity: 'high',   status: 'analysis', reporter: 'Иванов А.П.' },
  { id: 'NM-2024-040', date: '27.03.2026', location: 'Склад ГСМ',    type: 'Утечка жидкости',         severity: 'medium', status: 'closed',   reporter: 'Петров С.В.' },
  { id: 'NM-2024-039', date: '25.03.2026', location: 'Энергоблок А', type: 'Контакт с поверхностью',  severity: 'low',    status: 'closed',   reporter: 'Сидорова М.К.' },
  { id: 'NM-2024-038', date: '22.03.2026', location: 'Компрессорная',type: 'Нарушение ограждения',    severity: 'high',   status: 'measures', reporter: 'Козлов Д.Р.' },
  { id: 'NM-2024-037', date: '20.03.2026', location: 'Цех №3',       type: 'Скользкая поверхность',   severity: 'medium', status: 'closed',   reporter: 'Федоров И.Н.' },
];

const PASSPORTS = [
  { id: 'OBJ-001', name: 'Цех литья №3',           type: 'Производство',   risk: 'critical', docs: 12, expires: '15.05.2026', completeness: 87 },
  { id: 'OBJ-002', name: 'Склад ГСМ',              type: 'Склад',          risk: 'high',     docs: 8,  expires: '01.07.2026', completeness: 94 },
  { id: 'OBJ-003', name: 'Энергоблок А',            type: 'Энергетика',     risk: 'medium',   docs: 15, expires: '12.09.2026', completeness: 100 },
  { id: 'OBJ-004', name: 'Компрессорная станция',   type: 'Инфраструктура', risk: 'medium',   docs: 6,  expires: '30.06.2026', completeness: 72 },
  { id: 'OBJ-005', name: 'Административный блок',   type: 'Офис',           risk: 'low',      docs: 4,  expires: '31.12.2026', completeness: 100 },
];

const PREDICTIONS = [
  { factor: 'Температурный режим',     probability: 73, delta: +12, category: 'Физические' },
  { factor: 'Усталость персонала',     probability: 68, delta: +5,  category: 'Человеческий фактор' },
  { factor: 'Износ оборудования',      probability: 61, delta: -3,  category: 'Технические' },
  { factor: 'Неблагоприятные условия', probability: 44, delta: +8,  category: 'Среда' },
  { factor: 'Нарушение процедур',      probability: 39, delta: -7,  category: 'Процессные' },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const riskColor = (s: string) =>
  s === 'critical' ? 'text-ehs-red'   :
  s === 'high'     ? 'text-ehs-amber' :
  s === 'medium'   ? 'text-yellow-400' : 'text-ehs-green';

const riskBg = (s: string) =>
  s === 'critical' ? 'bg-ehs-red/10 border-ehs-red/30'     :
  s === 'high'     ? 'bg-ehs-amber/10 border-ehs-amber/30' :
  s === 'medium'   ? 'bg-yellow-400/10 border-yellow-400/30' :
                     'bg-ehs-green/10 border-ehs-green/30';

const riskLabel = (s: string) =>
  s === 'critical' ? 'Критический' :
  s === 'high'     ? 'Высокий'     :
  s === 'medium'   ? 'Средний'     : 'Низкий';

const statusConfig: Record<string, { label: string; color: string }> = {
  analysis: { label: 'Анализ',  color: 'text-ehs-blue' },
  measures: { label: 'Меры',    color: 'text-ehs-amber' },
  closed:   { label: 'Закрыт', color: 'text-ehs-green' },
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function StatCard({ value, label, sub, color, icon, delay = 0 }: {
  value: string; label: string; sub: string; color: string; icon: string; delay?: number;
}) {
  return (
    <div className="ehs-card p-5 flex flex-col gap-3 hover-scale animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
        <Icon name={icon} size={16} className={color} />
      </div>
      <div className={`text-4xl font-heading font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function RiskBar({ value, status }: { value: number; status: string }) {
  const barColor =
    status === 'critical' ? 'bg-ehs-red'    :
    status === 'high'     ? 'bg-ehs-amber'  :
    status === 'medium'   ? 'bg-yellow-400' : 'bg-ehs-green';
  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden risk-bar">
      <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${value}%` }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="0"   label="Несчастных случаев"  sub="За последние 187 дней"       color="text-ehs-green" icon="ShieldCheck"   delay={0}   />
        <StatCard value="41"  label="Почти случившихся"   sub="За квартал (+8 vs пред.)"    color="text-ehs-amber" icon="AlertTriangle" delay={80}  />
        <StatCard value="73%" label="Индекс безопасности" sub="Цель: ≥ 85%"                 color="text-ehs-blue"  icon="Activity"      delay={160} />
        <StatCard value="12"  label="Открытых мер"        sub="3 просрочены"                color="text-ehs-red"   icon="ClipboardList" delay={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 ehs-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold tracking-wide uppercase">Карта рисков объектов</h3>
            <span className="text-xs font-mono text-muted-foreground">ОБНОВЛЕНО 31.03.2026</span>
          </div>
          {RISK_ZONES.map((z, i) => (
            <div key={z.name} className="flex items-center gap-4 p-3 rounded border border-border/50 hover:border-border transition-colors animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium truncate">{z.name}</span>
                  {z.incidents > 0 && <span className="text-xs font-mono text-ehs-red animate-blink">⬤ {z.incidents} инц.</span>}
                </div>
                <RiskBar value={z.risk} status={z.status} />
              </div>
              <div className="text-right flex-shrink-0 w-20">
                <div className={`text-lg font-heading font-bold ${riskColor(z.status)}`}>{z.risk}%</div>
                <div className={`text-xs font-mono ${z.trend > 0 ? 'text-ehs-red' : 'text-ehs-green'}`}>
                  {z.trend > 0 ? '▲' : '▼'} {Math.abs(z.trend)}%
                </div>
              </div>
              <div className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 font-mono ${riskBg(z.status)} ${riskColor(z.status)}`}>
                {riskLabel(z.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Heinrich pyramid */}
        <div className="ehs-card p-5 flex flex-col">
          <h3 className="font-heading text-sm font-semibold tracking-wide uppercase mb-4">Пирамида Хайнриха</h3>
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            {[
              { label: 'Смертельные',         value: '0',    color: '#6b7280', w: 28 },
              { label: 'Тяжёлые травмы',      value: '0',    color: '#ef4444', w: 42 },
              { label: 'Лёгкие травмы',       value: '2',    color: '#f97316', w: 56 },
              { label: 'Первая помощь',       value: '7',    color: '#eab308', w: 70 },
              { label: 'Почти случившиеся',   value: '41',   color: '#3b82f6', w: 84 },
              { label: 'Небезопасные условия','value': '180+', color: '#22c55e', w: 100 },
            ].map((row, i) => (
              <div key={row.label} className="flex items-center gap-2 animate-slide-right" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="text-xs text-muted-foreground w-32 text-right leading-tight flex-shrink-0">{row.label}</div>
                <div
                  className="h-6 rounded flex items-center justify-end px-2 transition-all duration-700 flex-1"
                  style={{ backgroundColor: row.color + '22', border: `1px solid ${row.color}44`, maxWidth: `${row.w}%` }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">На каждый НС — ~300 «почти случившихся»</p>
        </div>
      </div>

      <div className="ehs-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-sm font-semibold tracking-wide uppercase">Последние «почти случившиеся»</h3>
          <button className="text-xs text-ehs-green hover:underline font-mono">Показать все →</button>
        </div>
        <div className="space-y-2">
          {NEAR_MISS.slice(0, 3).map((nm, i) => (
            <div key={nm.id} className="flex items-center gap-4 p-3 rounded border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${nm.severity === 'high' ? 'bg-ehs-red' : nm.severity === 'medium' ? 'bg-ehs-amber' : 'bg-yellow-400'}`} />
              <span className="font-mono text-xs text-muted-foreground w-28 flex-shrink-0">{nm.id}</span>
              <span className="text-sm flex-1 truncate">{nm.type}</span>
              <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{nm.location}</span>
              <span className={`text-xs font-mono flex-shrink-0 ${statusConfig[nm.status]?.color}`}>{statusConfig[nm.status]?.label}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">{nm.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Passports() {
  const [selected, setSelected] = useState<typeof PASSPORTS[0] | null>(null);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 space-y-2">
        <div className="ehs-card p-4 mb-2">
          <h3 className="font-heading text-sm font-semibold tracking-wide uppercase mb-1">Электронные паспорта</h3>
          <p className="text-xs text-muted-foreground">{PASSPORTS.length} объектов зарегистрировано</p>
        </div>
        {PASSPORTS.map((obj, i) => (
          <button
            key={obj.id}
            onClick={() => setSelected(obj)}
            className={`w-full text-left ehs-card p-4 hover-scale animate-fade-in transition-all ${selected?.id === obj.id ? 'border-ehs-green/50 ehs-glow-green' : ''}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{obj.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{obj.type} · {obj.id}</div>
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded border flex-shrink-0 ${riskBg(obj.risk)} ${riskColor(obj.risk)}`}>{riskLabel(obj.risk)}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Полнота</span>
                <span className="font-mono">{obj.completeness}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${obj.completeness === 100 ? 'bg-ehs-green' : obj.completeness >= 80 ? 'bg-ehs-amber' : 'bg-ehs-red'}`}
                  style={{ width: `${obj.completeness}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2 ehs-card p-6">
        {!selected ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
            <Icon name="FileText" size={48} className="text-muted-foreground/20" />
            <p className="text-muted-foreground text-sm">Выберите объект для просмотра паспорта</p>
          </div>
        ) : (
          <div className="space-y-6 animate-scale-in">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-muted-foreground mb-1">{selected.id}</div>
                <h2 className="font-heading text-2xl font-bold">{selected.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground">{selected.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${riskBg(selected.risk)} ${riskColor(selected.risk)}`}>Риск: {riskLabel(selected.risk)}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-heading font-bold ${selected.completeness === 100 ? 'text-ehs-green' : selected.completeness >= 80 ? 'text-ehs-amber' : 'text-ehs-red'}`}>{selected.completeness}%</div>
                <div className="text-xs text-muted-foreground">полнота паспорта</div>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-2 gap-3">
              {[
                { section: 'Общие сведения',             status: 'done',    icon: 'Building2' },
                { section: 'Схема объекта',               status: 'done',    icon: 'Map' },
                { section: 'Опасные факторы',             status: 'done',    icon: 'Zap' },
                { section: 'СИЗ и средства защиты',       status: selected.completeness < 90 ? 'warn' : 'done', icon: 'HardHat' },
                { section: 'Инструкции по ОТ',            status: 'done',    icon: 'BookOpen' },
                { section: 'План эвакуации',              status: selected.completeness < 80 ? 'missing' : 'done', icon: 'DoorOpen' },
                { section: 'Проверки и освидетельствования', status: 'done', icon: 'ClipboardCheck' },
                { section: 'Ответственные лица',          status: 'done',    icon: 'Users' },
              ].map((sec, i) => (
                <div
                  key={sec.section}
                  className={`flex items-center gap-3 p-3 rounded border animate-fade-in ${sec.status === 'done' ? 'border-border/50 bg-muted/20' : sec.status === 'warn' ? 'border-ehs-amber/30 bg-ehs-amber/5' : 'border-ehs-red/30 bg-ehs-red/5'}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Icon name={sec.icon} size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-xs flex-1">{sec.section}</span>
                  <Icon
                    name={sec.status === 'done' ? 'CheckCircle2' : sec.status === 'warn' ? 'Clock' : 'XCircle'}
                    size={14}
                    className={sec.status === 'done' ? 'text-ehs-green' : sec.status === 'warn' ? 'text-ehs-amber' : 'text-ehs-red'}
                  />
                </div>
              ))}
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-2xl font-heading font-bold">{selected.docs}</div><div className="text-xs text-muted-foreground mt-0.5">Документов</div></div>
              <div><div className="text-sm font-heading font-bold mt-1">{selected.expires}</div><div className="text-xs text-muted-foreground mt-0.5">Следующая проверка</div></div>
              <div><div className="text-2xl font-heading font-bold text-ehs-green">✓</div><div className="text-xs text-muted-foreground mt-0.5">Последний аудит пройден</div></div>
            </div>

            <button className="w-full py-2 border border-ehs-green/40 text-ehs-green text-sm font-medium rounded hover:bg-ehs-green/10 transition-colors">
              Открыть полный паспорт
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NearMiss() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? NEAR_MISS : NEAR_MISS.filter(n => n.severity === filter);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="ehs-card p-4 text-center animate-fade-in"><div className="text-3xl font-heading font-bold text-ehs-red">3</div><div className="text-xs text-muted-foreground mt-1">Высокий приоритет</div></div>
        <div className="ehs-card p-4 text-center animate-fade-in" style={{ animationDelay: '80ms' }}><div className="text-3xl font-heading font-bold text-ehs-amber">2</div><div className="text-xs text-muted-foreground mt-1">Средний приоритет</div></div>
        <div className="ehs-card p-4 text-center animate-fade-in" style={{ animationDelay: '160ms' }}><div className="text-3xl font-heading font-bold text-ehs-green">36</div><div className="text-xs text-muted-foreground mt-1">Закрыто в квартале</div></div>
      </div>

      <div className="ehs-card border-l-4 border-l-ehs-blue p-4 flex gap-3 animate-fade-in">
        <Icon name="Brain" size={20} className="text-ehs-blue flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-medium">Аналитика трендов</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-ehs-amber font-medium">+22% рост</span> регистрации ПС за квартал — хороший знак: культура безопасности улучшается.
            Основная категория: <span className="text-foreground">падение предметов с высоты</span> (34%).
            Рекомендуется внеплановый инструктаж в Цехе №3.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'high', 'medium', 'low'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-mono rounded border transition-all ${filter === f ? 'border-ehs-green/50 bg-ehs-green/10 text-ehs-green' : 'border-border text-muted-foreground hover:border-muted-foreground'}`}
          >
            {f === 'all' ? 'Все' : f === 'high' ? 'Высокий' : f === 'medium' ? 'Средний' : 'Низкий'}
          </button>
        ))}
      </div>

      <div className="ehs-card overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_110px_90px_100px] gap-4 px-4 py-2 border-b border-border">
          {['ID', 'Тип события', 'Объект', 'Серьёзность', 'Статус', 'Дата'].map(h => (
            <span key={h} className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{h}</span>
          ))}
        </div>
        {filtered.map((nm, i) => (
          <div
            key={nm.id}
            className="grid grid-cols-[auto_1fr_1fr_110px_90px_100px] gap-4 px-4 py-3 border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="font-mono text-xs text-muted-foreground">{nm.id}</span>
            <span className="text-sm truncate">{nm.type}</span>
            <span className="text-sm text-muted-foreground truncate">{nm.location}</span>
            <span className={`text-xs font-mono ${nm.severity === 'high' ? 'text-ehs-red' : nm.severity === 'medium' ? 'text-ehs-amber' : 'text-yellow-400'}`}>
              ● {nm.severity === 'high' ? 'Высокий' : nm.severity === 'medium' ? 'Средний' : 'Низкий'}
            </span>
            <span className={`text-xs font-mono ${statusConfig[nm.status]?.color}`}>{statusConfig[nm.status]?.label}</span>
            <span className="text-xs text-muted-foreground">{nm.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Predict() {
  return (
    <div className="space-y-4">
      <div className="ehs-card grid-pattern p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-ehs-green animate-pulse-slow" />
            <span className="text-xs font-mono text-ehs-green uppercase tracking-widest">Предиктивный анализ активен</span>
          </div>
          <h2 className="font-heading text-3xl font-bold">От реагирования — к прогнозированию</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Модель анализирует 47 факторов: данные с датчиков, журналы ТО, метеоусловия, биометрику смен.
            Горизонт прогноза — <span className="text-foreground font-medium">14 дней</span>.
          </p>
        </div>
      </div>

      <div className="ehs-card p-5">
        <h3 className="font-heading text-sm font-semibold tracking-wide uppercase mb-4">Топ факторов риска — следующие 14 дней</h3>
        <div className="space-y-4">
          {PREDICTIONS.map((p, i) => (
            <div key={p.factor} className="space-y-2 animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{p.factor}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{p.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${p.delta > 0 ? 'text-ehs-red' : 'text-ehs-green'}`}>{p.delta > 0 ? `▲ +${p.delta}%` : `▼ ${p.delta}%`}</span>
                  <span className={`text-sm font-heading font-bold w-10 text-right ${p.probability >= 65 ? 'text-ehs-red' : p.probability >= 45 ? 'text-ehs-amber' : 'text-ehs-green'}`}>{p.probability}%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden risk-bar">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${p.probability >= 65 ? 'bg-ehs-red' : p.probability >= 45 ? 'bg-ehs-amber' : 'bg-ehs-green'}`}
                  style={{ width: `${p.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { priority: 'Критично', color: 'border-l-ehs-red', textColor: 'text-ehs-red',   icon: 'AlertCircle', btnBorder: 'border-ehs-red/40 hover:bg-ehs-red/10',
            title: 'Цех №3 — внеплановый осмотр',
            desc: 'Температура превышает норму на 8°C третью смену подряд. Вероятность ЧП за 7 дней: 73%. Рекомендована остановка для проверки охлаждения.',
            deadline: 'до 02.04.2026' },
          { priority: 'Важно',    color: 'border-l-ehs-amber', textColor: 'text-ehs-amber', icon: 'Clock',        btnBorder: 'border-ehs-amber/40 hover:bg-ehs-amber/10',
            title: 'Ротация ночных смен',
            desc: 'Индекс усталости: 0.78 (норма ≤ 0.5). Среднее время без отдыха — 6.2 ч. Рекомендуется корректировка расписания и мед.осмотр.',
            deadline: 'до 05.04.2026' },
          { priority: 'Плановое', color: 'border-l-ehs-blue',  textColor: 'text-ehs-blue',  icon: 'Wrench',       btnBorder: 'border-ehs-blue/40 hover:bg-ehs-blue/10',
            title: 'ТО компрессора К-12',
            desc: 'Вибросенсор фиксирует отклонение 2.3 мм/с. Прогнозируемый выход: через 18 ± 3 дня. ТО предотвратит инцидент.',
            deadline: 'до 14.04.2026' },
        ].map((rec, i) => (
          <div key={rec.title} className={`ehs-card border-l-4 ${rec.color} p-4 space-y-3 animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name={rec.icon} size={14} className={rec.textColor} />
                <span className={`text-xs font-mono font-bold ${rec.textColor}`}>{rec.priority}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{rec.deadline}</span>
            </div>
            <div className="text-sm font-semibold">{rec.title}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{rec.desc}</p>
            <button className={`w-full py-1.5 border text-xs font-medium rounded transition-colors ${rec.textColor} ${rec.btnBorder}`}>
              Назначить задачу
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderSection({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="ehs-card p-16 flex flex-col items-center justify-center gap-4 text-center animate-scale-in">
      <Icon name={icon} size={56} className="text-muted-foreground/20" />
      <div>
        <h3 className="font-heading text-lg font-semibold">{label}</h3>
        <p className="text-sm text-muted-foreground mt-1">Раздел в разработке. Напишите, что нужно добавить.</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function Index() {
  const [active, setActive] = useState('dashboard');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const currentSection = NAV_ITEMS.find(n => n.id === active);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-ehs-green/20 border border-ehs-green/40 flex items-center justify-center">
              <Icon name="ShieldCheck" size={14} className="text-ehs-green" />
            </div>
            <span className="font-heading font-bold text-sm tracking-wide text-foreground">EHS PLATFORM</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground hidden md:block">Охрана труда и промышленная безопасность</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-ehs-green animate-pulse-slow" />
            Системы в норме
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">АД</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r border-border flex flex-col bg-sidebar py-4">
          <nav className="flex-1 px-2 space-y-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all ${
                  active === item.id
                    ? 'bg-ehs-green/10 text-ehs-green border border-ehs-green/20'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground border border-transparent'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span className="text-xs font-medium">{item.label}</span>
                {item.id === 'nearmiss' && (
                  <span className="ml-auto text-xs font-mono bg-ehs-red/20 text-ehs-red px-1 rounded">3</span>
                )}
              </button>
            ))}
          </nav>
          <div className="px-3 py-3 border-t border-border mt-2">
            <div className="ehs-card p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Безопасных дней</div>
              <div className="text-3xl font-heading font-bold text-ehs-green">187</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name={currentSection?.icon || 'Circle'} size={16} className="text-ehs-green" />
              <span className="font-heading font-semibold text-sm tracking-wide">{currentSection?.label?.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs border border-ehs-green/40 text-ehs-green rounded hover:bg-ehs-green/10 transition-colors flex items-center gap-1.5">
                <Icon name="Plus" size={12} />Добавить запись
              </button>
              <button className="px-3 py-1.5 text-xs border border-border text-muted-foreground rounded hover:bg-muted/30 transition-colors flex items-center gap-1.5">
                <Icon name="Download" size={12} />Экспорт
              </button>
            </div>
          </div>

          <div className="p-6">
            {active === 'dashboard' && <Dashboard />}
            {active === 'passports'  && <Passports />}
            {active === 'nearmiss'   && <NearMiss />}
            {active === 'predict'    && <Predict />}
            {active === 'training'   && <PlaceholderSection icon="GraduationCap" label="Управление обучением" />}
            {active === 'reports'    && <PlaceholderSection icon="BarChart3" label="Отчёты и аналитика" />}
          </div>
        </main>
      </div>
    </div>
  );
}
