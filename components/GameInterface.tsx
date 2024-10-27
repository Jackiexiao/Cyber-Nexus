'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

interface StoryNode {
  text: string;
  choices: { text: string; nextNode: string }[];
}

const storyNodes: Record<string, StoryNode> = {
  start: {
    text: "欢迎来到新东京，黑客Echo。你收到了一条加密消息，是否查看？",
    choices: [
      { text: "查看消息", nextNode: "viewMessage" },
      { text: "忽略消息", nextNode: "ignoreMessage" }
    ]
  },
  viewMessage: {
    text: `消息内容：
"Echo，我们需要你的帮助。NeoCore公司正在策划一个危险的计划。
你的第一个任务是入侵他们的外围系统。准备好了吗？"`,
    choices: [
      { text: "准备好了", nextNode: "startHacking" },
      { text: "需要更多信息", nextNode: "moreInfo" }
    ]
  },
  ignoreMessage: {
    text: "你选择忽略消息。但是，你的AI助手Pixel提醒你这可能是一个重要的机会。要重新考虑吗？",
    choices: [
      { text: "重新查看消息", nextNode: "viewMessage" },
      { text: "继续忽略", nextNode: "gameOver" }
    ]
  },
  startHacking: {
    text: `很好，黑客入侵开始。你面前出现了一个复杂的防火墙。
你需要找到正确的入口点。提示：寻找系统中的弱点。`,
    choices: [
      { text: "分析防火墙", nextNode: "analyzeFirewall" },
      { text: "强攻入侵", nextNode: "bruteForce" },
      { text: "寻找后门", nextNode: "findBackdoor" }
    ]
  },
  moreInfo: {
    text: `Nova的声音传来："NeoCore正在开发一种能够控制市民思想的技术。
我们需要你潜入他们的系统，找出更多信息。你随时可以联系我寻求帮助。"`,
    choices: [
      { text: "开始任务", nextNode: "startHacking" },
      { text: "询问更多细节", nextNode: "askMoreDetails" }
    ]
  },
  gameOver: {
    text: "你错过了改变新东京命运的机会。游戏结束。",
    choices: [
      { text: "重新开始", nextNode: "start" }
    ]
  },
  // 可以继续添加更多的节点...
};

const GameInterface: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<string>('start');

  const handleChoice = (nextNode: string) => {
    setCurrentNode(nextNode);
  };

  const currentStoryNode = storyNodes[currentNode];

  return (
    <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="mb-4 h-64 overflow-y-auto bg-black p-4 rounded">
        <p className="text-green-500">{currentStoryNode.text}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {currentStoryNode.choices.map((choice, index) => (
          <Button 
            key={index} 
            onClick={() => handleChoice(choice.nextNode)}
            className="bg-green-700 hover:bg-green-600"
          >
            {choice.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GameInterface;
