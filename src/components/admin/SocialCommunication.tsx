import React, { useState } from 'react';
import { Instagram, MessageCircle, Phone, Users, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAdminStore } from '@/hooks/useAdminStore';
import { toast } from 'sonner';

export const SocialCommunication = () => {
  const { customers } = useAdminStore();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: Phone, color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { id: 'vk', name: 'VKontakte', icon: Users, color: 'bg-gradient-to-br from-blue-500 to-blue-700' },
  ];

  const customersWithSocial = customers.filter(customer => 
    customer.socialMedia && Object.values(customer.socialMedia).some(value => value)
  );

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customersWithSocial.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customersWithSocial.map(c => c.id));
    }
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSendMessage = () => {
    if (!message.trim() || selectedCustomers.length === 0 || selectedPlatforms.length === 0) {
      toast.error('Заполните все поля');
      return;
    }

    // В реальном приложении здесь была бы интеграция с API соц.сетей
    toast.success(`Сообщение отправлено ${selectedCustomers.length} пользователям в ${selectedPlatforms.length} соц.сетях`);
    
    // Очищаем форму
    setMessage('');
    setSelectedCustomers([]);
    setSelectedPlatforms([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Рассылка в социальных сетях</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор платформ */}
          <div className="space-y-3">
            <Label>Выберите платформы для рассылки</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.map(platform => {
                const IconComponent = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <Button
                    key={platform.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-16 ${isSelected ? platform.color + ' text-white hover:opacity-90' : ''}`}
                    onClick={() => handlePlatformSelect(platform.id)}
                  >
                    <div className="flex flex-col items-center">
                      <IconComponent className="h-5 w-5 mb-1" />
                      <span className="text-xs">{platform.name}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Текст сообщения */}
          <div className="space-y-2">
            <Label htmlFor="message">Текст сообщения</Label>
            <Textarea
              id="message"
              placeholder="Введите текст сообщения для рассылки..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Выбор получателей */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Получатели ({customersWithSocial.length} пользователей с соц.сетями)</Label>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedCustomers.length === customersWithSocial.length ? 'Снять выбор' : 'Выбрать всех'}
              </Button>
            </div>

            {customersWithSocial.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Нет пользователей с указанными социальными сетями</p>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {customersWithSocial.map(customer => (
                  <div key={customer.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={customer.id}
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => handleCustomerSelect(customer.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                      <div className="flex space-x-1 mt-1">
                        {customer.socialMedia?.instagram && (
                          <Badge variant="outline" className="text-xs">
                            <Instagram className="h-3 w-3 mr-1" />
                            Instagram
                          </Badge>
                        )}
                        {customer.socialMedia?.telegram && (
                          <Badge variant="outline" className="text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Telegram
                          </Badge>
                        )}
                        {customer.socialMedia?.whatsapp && (
                          <Badge variant="outline" className="text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Badge>
                        )}
                        {customer.socialMedia?.vk && (
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            VK
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {customer.orders} заказов
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кнопка отправки */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Выбрано: {selectedCustomers.length} получателей, {selectedPlatforms.length} платформ
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || selectedCustomers.length === 0 || selectedPlatforms.length === 0}
              className="min-w-32"
            >
              <Send className="h-4 w-4 mr-2" />
              Отправить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};