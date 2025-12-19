import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Активных пользователей', value: '2,847', change: '+12%', icon: 'Users', color: 'text-blue-500' },
    { label: 'API запросов/сек', value: '1,234', change: '+8%', icon: 'Activity', color: 'text-green-500' },
    { label: 'Системная нагрузка', value: '67%', change: '-3%', icon: 'Cpu', color: 'text-purple-500' },
    { label: 'Доступное место', value: '2.4 TB', change: '-15%', icon: 'HardDrive', color: 'text-orange-500' },
  ];

  const users = [
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'Администратор', status: 'active' },
    { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', role: 'Разработчик', status: 'active' },
    { id: 3, name: 'Алексей Смирнов', email: 'alexey@example.com', role: 'Аналитик', status: 'inactive' },
    { id: 4, name: 'Ольга Иванова', email: 'olga@example.com', role: 'Менеджер', status: 'active' },
  ];

  const logs = [
    { id: 1, action: 'Создание резервной копии', user: 'Система', time: '10:34', status: 'success' },
    { id: 2, action: 'Изменение прав доступа', user: 'Иван Петров', time: '10:28', status: 'success' },
    { id: 3, action: 'Попытка входа', user: 'Неизвестный', time: '10:15', status: 'warning' },
    { id: 4, action: 'API интеграция', user: 'Мария Сидорова', time: '09:52', status: 'success' },
    { id: 5, action: 'Обновление конфигурации', user: 'Система', time: '09:30', status: 'info' },
  ];

  const apiEndpoints = [
    { name: '/api/users', status: 'active', requests: '2.3K', latency: '45ms' },
    { name: '/api/analytics', status: 'active', requests: '1.8K', latency: '120ms' },
    { name: '/api/backup', status: 'maintenance', requests: '0', latency: '-' },
    { name: '/api/monitoring', status: 'active', requests: '5.6K', latency: '23ms' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-heading font-bold text-white">АСУБТ-Б2</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Система администрирования</p>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Панель управления', icon: 'LayoutDashboard' },
              { id: 'users', label: 'Пользователи', icon: 'Users' },
              { id: 'api', label: 'API-управление', icon: 'Code2' },
              { id: 'monitoring', label: 'Мониторинг', icon: 'Activity' },
              { id: 'logs', label: 'История операций', icon: 'FileText' },
              { id: 'backup', label: 'Резервное копирование', icon: 'Database' },
              { id: 'security', label: 'Безопасность', icon: 'Shield' },
              { id: 'support', label: 'Поддержка', icon: 'HelpCircle' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">АД</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Администратор</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">admin@asubt.ru</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <header className="bg-card border-b border-border sticky top-0 z-10">
            <div className="flex items-center justify-between px-8 py-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {activeTab === 'dashboard' && 'Панель управления'}
                  {activeTab === 'users' && 'Управление пользователями'}
                  {activeTab === 'api' && 'API-управление'}
                  {activeTab === 'monitoring' && 'Мониторинг системы'}
                  {activeTab === 'logs' && 'История операций'}
                  {activeTab === 'backup' && 'Резервное копирование'}
                  {activeTab === 'security' && 'Безопасность'}
                  {activeTab === 'support' && 'Техническая поддержка'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Input type="search" placeholder="Поиск..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Icon name="Bell" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Settings" size={18} />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8 animate-fade-in">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index} className="hover-scale">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </CardTitle>
                        <Icon name={stat.icon} className={stat.color} size={20} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold font-heading">{stat.value}</div>
                        <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} за последний час
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Активность системы</CardTitle>
                      <CardDescription>Метрики за последние 24 часа</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {['CPU', 'RAM', 'Network', 'Disk I/O'].map((metric, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{metric}</span>
                              <span className="font-medium">{[67, 82, 45, 38][idx]}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${[67, 82, 45, 38][idx]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Последние события</CardTitle>
                      <CardDescription>Системные события и действия</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[240px]">
                        <div className="space-y-4">
                          {logs.slice(0, 5).map((log) => (
                            <div key={log.id} className="flex items-start gap-3">
                              <div className={`mt-1 w-2 h-2 rounded-full ${
                                log.status === 'success' ? 'bg-green-500' :
                                log.status === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{log.action}</p>
                                <p className="text-xs text-muted-foreground">{log.user} • {log.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Статус API-эндпоинтов</CardTitle>
                    <CardDescription>Мониторинг доступности и производительности</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {apiEndpoints.map((endpoint, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Badge variant={endpoint.status === 'active' ? 'default' : 'secondary'}>
                              {endpoint.status === 'active' ? 'Активен' : 'Обслуживание'}
                            </Badge>
                            <code className="text-sm font-mono">{endpoint.name}</code>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-muted-foreground">{endpoint.requests} запросов</span>
                            <span className="font-medium">{endpoint.latency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'users' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Пользователи системы</CardTitle>
                      <CardDescription>Управление доступом и правами</CardDescription>
                    </div>
                    <Button>
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Добавить пользователя
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'api' && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">API-ключи</CardTitle>
                    <CardDescription>Управление доступом к API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full">
                        <Icon name="Key" size={16} className="mr-2" />
                        Создать новый API-ключ
                      </Button>
                      <Separator />
                      <div className="space-y-3">
                        {['Production API Key', 'Development API Key', 'Testing API Key'].map((key, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon name="Key" size={16} className="text-muted-foreground" />
                              <div>
                                <p className="font-medium">{key}</p>
                                <code className="text-xs text-muted-foreground">••••••••••••{Math.random().toString(36).slice(-4)}</code>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="Copy" size={14} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Статистика API</CardTitle>
                    <CardDescription>Использование за последние 7 дней</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-3xl font-bold font-heading text-primary">1.2M</p>
                        <p className="text-sm text-muted-foreground mt-1">Всего запросов</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-3xl font-bold font-heading text-green-600">99.8%</p>
                        <p className="text-sm text-muted-foreground mt-1">Uptime</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-3xl font-bold font-heading text-blue-600">87ms</p>
                        <p className="text-sm text-muted-foreground mt-1">Ср. задержка</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">Нагрузка CPU</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold font-heading text-primary mb-2">67%</div>
                        <p className="text-sm text-muted-foreground">Средняя за час</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">Память</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold font-heading text-green-600 mb-2">82%</div>
                        <p className="text-sm text-muted-foreground">6.5 GB / 8 GB</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">Сеть</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold font-heading text-blue-600 mb-2">45%</div>
                        <p className="text-sm text-muted-foreground">234 Mbps</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Мониторинг сервисов</CardTitle>
                    <CardDescription>Статус всех компонентов системы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Web Server', status: 'operational' },
                        { name: 'Database', status: 'operational' },
                        { name: 'Cache Server', status: 'operational' },
                        { name: 'Message Queue', status: 'degraded' },
                        { name: 'File Storage', status: 'operational' },
                        { name: 'Backup Service', status: 'maintenance' },
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              service.status === 'operational' ? 'bg-green-500' :
                              service.status === 'degraded' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`} />
                            <span className="font-medium">{service.name}</span>
                          </div>
                          <Badge variant={
                            service.status === 'operational' ? 'default' :
                            service.status === 'degraded' ? 'secondary' :
                            'outline'
                          }>
                            {service.status === 'operational' ? 'Работает' :
                             service.status === 'degraded' ? 'Деградация' :
                             'Обслуживание'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'logs' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">История операций</CardTitle>
                  <CardDescription>Все действия в системе</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-green-500' :
                            log.status === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">{log.user}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">{log.time}</div>
                          <Badge variant={
                            log.status === 'success' ? 'default' :
                            log.status === 'warning' ? 'secondary' :
                            'outline'
                          }>
                            {log.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {activeTab === 'backup' && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-heading">Резервное копирование</CardTitle>
                        <CardDescription>Управление бэкапами системы</CardDescription>
                      </div>
                      <Button>
                        <Icon name="Download" size={16} className="mr-2" />
                        Создать резервную копию
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'backup_2024_12_19_10_00.tar.gz', size: '2.4 GB', date: '19.12.2024 10:00', status: 'completed' },
                        { name: 'backup_2024_12_18_10_00.tar.gz', size: '2.3 GB', date: '18.12.2024 10:00', status: 'completed' },
                        { name: 'backup_2024_12_17_10_00.tar.gz', size: '2.2 GB', date: '17.12.2024 10:00', status: 'completed' },
                      ].map((backup, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Icon name="Archive" size={24} className="text-muted-foreground" />
                            <div>
                              <p className="font-medium font-mono text-sm">{backup.name}</p>
                              <p className="text-xs text-muted-foreground">{backup.size} • {backup.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Download" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="RotateCcw" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Настройки автоматического резервирования</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Ежедневное резервное копирование</p>
                          <p className="text-sm text-muted-foreground">Каждый день в 10:00</p>
                        </div>
                        <Badge variant="default">Включено</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Хранить резервные копии</p>
                          <p className="text-sm text-muted-foreground">30 дней</p>
                        </div>
                        <Button variant="outline" size="sm">Изменить</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Безопасность системы</CardTitle>
                    <CardDescription>Настройки защиты и аудита</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Двухфакторная аутентификация', status: true, description: 'Обязательна для всех администраторов' },
                        { name: 'Шифрование данных', status: true, description: 'AES-256 для хранилища' },
                        { name: 'Аудит действий', status: true, description: 'Логирование всех операций' },
                        { name: 'Автоматическая блокировка', status: true, description: 'После 5 неудачных попыток входа' },
                        { name: 'VPN-доступ', status: false, description: 'Требуется настройка' },
                      ].map((setting, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Icon name={setting.status ? 'CheckCircle2' : 'XCircle'} 
                                  className={setting.status ? 'text-green-500' : 'text-muted-foreground'} 
                                  size={20} />
                            <div>
                              <p className="font-medium">{setting.name}</p>
                              <p className="text-sm text-muted-foreground">{setting.description}</p>
                            </div>
                          </div>
                          <Badge variant={setting.status ? 'default' : 'secondary'}>
                            {setting.status ? 'Включено' : 'Выключено'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Последние события безопасности</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { event: 'Неудачная попытка входа', ip: '192.168.1.100', time: '2 минуты назад', severity: 'warning' },
                        { event: 'Изменение пароля', user: 'Иван Петров', time: '1 час назад', severity: 'info' },
                        { event: 'Новый API-ключ создан', user: 'Мария Сидорова', time: '3 часа назад', severity: 'info' },
                      ].map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                          <Icon name="Shield" className={
                            event.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                          } size={20} />
                          <div className="flex-1">
                            <p className="font-medium">{event.event}</p>
                            <p className="text-sm text-muted-foreground">
                              {event.ip || event.user} • {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'support' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Техническая поддержка</CardTitle>
                  <CardDescription>Справка и документация</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold">Быстрая помощь</h3>
                      {[
                        { icon: 'Book', title: 'Документация', desc: 'Руководство пользователя' },
                        { icon: 'MessageSquare', title: 'Чат поддержки', desc: 'Онлайн-консультация' },
                        { icon: 'Mail', title: 'Email поддержка', desc: 'support@asubt.ru' },
                        { icon: 'Phone', title: 'Телефон', desc: '+7 (495) 123-45-67' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Icon name={item.icon} size={24} className="text-primary" />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold">Информация о системе</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between p-3 border rounded-lg">
                          <span className="text-muted-foreground">Версия системы</span>
                          <span className="font-medium">2.4.1</span>
                        </div>
                        <div className="flex justify-between p-3 border rounded-lg">
                          <span className="text-muted-foreground">Последнее обновление</span>
                          <span className="font-medium">15.12.2024</span>
                        </div>
                        <div className="flex justify-between p-3 border rounded-lg">
                          <span className="text-muted-foreground">Лицензия</span>
                          <Badge variant="default">Корпоративная</Badge>
                        </div>
                        <div className="flex justify-between p-3 border rounded-lg">
                          <span className="text-muted-foreground">Срок действия</span>
                          <span className="font-medium">до 31.12.2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
