"use client"

import { useState } from "react"
import { communityPosts } from "@/data/community"
import type { CommunityPost } from "@/data/community"

export const dynamic = "force-static"

export default function CommunityPage() {
  const [showPostForm, setShowPostForm] = useState(false)
  const [postContent, setPostContent] = useState("")
  const [posts, setPosts] = useState(communityPosts)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))
  const filteredPosts = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts

  const handlePost = () => {
    if (!postContent.trim()) return
    const newPost: CommunityPost = {
      id: posts.length + 1,
      user: "足球小将",
      avatar: "⚽",
      content: postContent.trim(),
      likes: 0,
      comments: 0,
      time: "刚刚",
      tags: ["讨论"],
    }
    setPosts([newPost, ...posts])
    setPostContent("")
    setShowPostForm(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-3 py-4 pb-20">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-extrabold text-green-900">💬 社区</h1>
        <button
          onClick={() => setShowPostForm(true)}
          className="px-3 py-1.5 rounded-lg bg-green-700 text-white text-xs font-bold hover:bg-green-600 transition-all"
        >
          ✏️ 发帖
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-3">球迷交流区 · 文明发言，理性讨论</p>

      {/* 发帖弹窗 */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPostForm(false)}>
          <div className="bg-white rounded-xl p-4 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-green-900 mb-3 text-sm">📝 发帖</h3>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="说说你对世界杯的看法..."
              className="w-full h-24 border border-green-200 rounded-lg p-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowPostForm(false)}
                className="flex-1 py-2 rounded-lg border border-green-200 text-xs font-semibold text-gray-500"
              >
                取消
              </button>
              <button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="flex-1 py-2 rounded-lg bg-green-700 text-white text-xs font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 标签筛选 */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
            !activeTag ? "bg-green-700 text-white" : "bg-white border border-green-200 text-gray-500 hover:bg-green-50"
          }`}
        >
          全部
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
              activeTag === tag ? "bg-green-700 text-white" : "bg-white border border-green-200 text-gray-500 hover:bg-green-50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 帖子列表 */}
      <div className="space-y-2">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-green-200 p-3 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-full text-xs flex items-center justify-center bg-green-50">{post.avatar}</div>
              <span className="text-xs font-semibold text-green-800">{post.user}</span>
              <span className="text-[9px] text-gray-400">{post.time}</span>
              <div className="flex gap-1 ml-auto">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full cursor-pointer"
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs mb-2 leading-relaxed">{post.content}</p>
            <div className="flex gap-3 text-[10px] text-gray-400">
              <span className="cursor-pointer hover:text-green-700 transition-colors flex items-center gap-0.5">
                👍 <span>{post.likes}</span>
              </span>
              <span className="cursor-pointer hover:text-green-700 transition-colors flex items-center gap-0.5">
                💬 <span>{post.comments}</span>
              </span>
              <span className="cursor-pointer hover:text-green-700 transition-colors ml-auto">↗️ 分享</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
