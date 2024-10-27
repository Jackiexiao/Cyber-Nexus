'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import styles from './page.module.css'

interface Scene {
  id: string;
  text: string;
  choices: {
    text: string;
    nextScene: string;
  }[];
}

const scenes: Record<string, Scene> = {
  start: {
    id: 'start',
    text: "2184年,新东京。你是Zero,一名拥有特殊能力的黑客。你收到了一条神秘消息。",
    choices: [
      { text: "查看消息", nextScene: "viewMessage" },
      { text: "忽略消息", nextScene: "ignoreMessage" },
    ],
  },
  viewMessage: {
    id: 'viewMessage',
    text: "消息内容：'Zero,我们需要你的帮助。Nexus正在控制这座城市。你是我们的希望。'",
    choices: [
      { text: "接受任务", nextScene: "acceptMission" },
      { text: "拒绝任务", nextScene: "refuseMission" },
    ],
  },
  ignoreMessage: {
    id: 'ignoreMessage',
    text: "你选择忽略消息。然而,第二天,你发现整座城市陷入混乱。你错过了拯救世界的机会。",
    choices: [
      { text: "游戏结束", nextScene: "gameOver" },
    ],
  },
  acceptMission: {
    id: 'acceptMission',
    text: "你决定接受任务。你的第一个目标是潜入Nexus的数据中心。你要如何行动？",
    choices: [
      { text: "正面入侵", nextScene: "frontalAssault" },
      { text: "潜入后门", nextScene: "sneakIn" },
    ],
  },
  refuseMission: {
    id: 'refuseMission',
    text: "你拒绝了任务。几周后,Nexus完全控制了城市。你成为了它的傀儡。",
    choices: [
      { text: "游戏结束", nextScene: "gameOver" },
    ],
  },
  frontalAssault: {
    id: 'frontalAssault',
    text: "你选择正面入侵。警报响起,你被Nexus的安保力量包围了。",
    choices: [
      { text: "继续战斗", nextScene: "continueFight" },
      { text: "投降", nextScene: "surrender" },
    ],
  },
  sneakIn: {
    id: 'sneakIn',
    text: "你成功潜入了Nexus的数据中心。你发现了一个巨大的服务器房间。",
    choices: [
      { text: "下载数据", nextScene: "downloadData" },
      { text: "破坏系统", nextScene: "sabotageSystem" },
    ],
  },
  continueFight: {
    id: 'continueFight',
    text: "你奋力战斗,但寡不敌众。你被捕获并被Nexus改造成了它的傀儡。",
    choices: [
      { text: "游戏结束", nextScene: "gameOver" },
    ],
  },
  surrender: {
    id: 'surrender',
    text: "你选择投降。Nexus决定给你一个机会,加入它的阵营。",
    choices: [
      { text: "加入Nexus", nextScene: "joinNexus" },
      { text: "拒绝加入", nextScene: "refuseNexus" },
    ],
  },
  downloadData: {
    id: 'downloadData',
    text: "你成功下载了关键数据。这些信息可能是推翻Nexus的关键。",
    choices: [
      { text: "逃离现场", nextScene: "escape" },
      { text: "继续探索", nextScene: "continueExploring" },
    ],
  },
  sabotageSystem: {
    id: 'sabotageSystem',
    text: "你成功破坏了Nexus的核心系统。整个城市的AI系统开始崩溃。",
    choices: [
      { text: "完成任务", nextScene: "missionComplete" },
    ],
  },
  gameOver: {
    id: 'gameOver',
    text: "游戏结束。你的冒险到此为止。",
    choices: [
      { text: "重新开始", nextScene: "start" },
    ],
  },
  missionComplete: {
    id: 'missionComplete',
    text: "恭喜你！你成功瓦解了Nexus的控制,拯救了新东京。你是这座城市的英雄。",
    choices: [
      { text: "重新开始", nextScene: "start" },
    ],
  },
}

interface GameState {
  health: number;
  money: number;
  reputation: number;
}

export default function Home() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes.start)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    health: 100,
    money: 1000,
    reputation: 50,
  })

  useEffect(() => {
    setIsTypingComplete(false)
    setIsTransitioning(false)
  }, [currentScene])

  const handleChoice = (nextScene: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene(scenes[nextScene])
      // 这里可以根据选择更新游戏状态
      // 例如：setGameState(prevState => ({ ...prevState, health: prevState.health - 10 }))
    }, 500) // 等待500ms后切换场景，给动画足够的时间
  }

  return (
    <main className={styles.main}>
      <div className={styles.gameContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                currentScene.text,
                () => setIsTypingComplete(true)
              ]}
              wrapper="div"
              cursor={true}
              repeat={0}
              speed={50}
              style={{ fontSize: '1em', display: 'inline-block' }}
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {isTypingComplete && !isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.choices}
            >
              {currentScene.choices.map((choice, index) => (
                <button key={index} onClick={() => handleChoice(choice.nextScene)}>
                  {choice.text}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.statusBar}>
        <div>健康: {gameState.health}</div>
        <div>金钱: {gameState.money}</div>
        <div>声望: {gameState.reputation}</div>
      </div>
    </main>
  )
}
