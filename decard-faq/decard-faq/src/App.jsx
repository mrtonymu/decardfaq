import React, { useState } from 'react';
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Copy } from "lucide-react";

const faqData = [
  {
    question: "客户收不到 OTP 怎么办？",
    answer: "确认用户号码无误，若正确请联系 Frank 确认短信服务是否异常。",
    tags: ["OTP", "登录", "短信"],
    macro: "您好，麻烦您确认是否使用正确的手机号。如果没问题，我们会帮您提交技术团队处理，请稍候。"
  }
];

const categories = Array.from(new Set(faqData.flatMap(faq => faq.tags)));

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === '全部' || faq.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('内容已复制！');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">FAQ 分类</h2>
        <ul className="space-y-2">
          <li>
            <Button variant={activeCategory === '全部' ? 'default' : 'ghost'} onClick={() => setActiveCategory('全部')} className="w-full text-left">
              全部
            </Button>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <Button variant={activeCategory === cat ? 'default' : 'ghost'} onClick={() => setActiveCategory(cat)} className="w-full text-left">
                {cat}
              </Button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">DeCard FAQ 知识库</h1>

        <Input
          placeholder="请输入关键字，例如：充值、冻结卡、USDT"
          className="mb-6"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {filteredFAQs.length === 0 ? (
          <p className="text-gray-500">没有找到相关问题</p>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-lg mb-2">{faq.question}</h2>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(faq.answer)} title="复制答案">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">{faq.answer}</p>

                  {faq.macro && (
                    <div className="bg-gray-100 p-3 rounded mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">客服回应话术：</p>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(faq.macro)} title="复制话术">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{faq.macro}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-2">标签: {faq.tags.join(', ')}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
