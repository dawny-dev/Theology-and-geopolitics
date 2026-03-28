'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Comments({ articleId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: false })

      if (data) setComments(data)
    }

    fetchComments()
  }, [articleId])

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment || !newUsername || !newEmail) return

    setLoading(true)

    const { error } = await supabase
      .from('comments')
      .insert({
        article_id: articleId,
        author_username: newUsername,
        author_email: newEmail,
        content: newComment,
        parent_comment_id: replyTo
      })

    if (!error) {
      setNewComment('')
      setNewUsername('')
      setNewEmail('')
      setReplyTo(null)

      // Refresh comments
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: false })

      if (data) setComments(data)
    }

    setLoading(false)
  }

  // Group comments by parent
  const topLevelComments = comments.filter(c => !c.parent_comment_id)
  const getReplies = (commentId) => comments.filter(c => c.parent_comment_id === commentId)

  return (
    <div style={styles.container}>
      <style>{`
        .comments-title {
          color: #d4af37;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .comment-form {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          color: white;
          font-size: 0.95rem;
        }

        .form-input::placeholder {
          color: rgba(212, 175, 55, 0.5);
        }

        .form-input:focus {
          outline: none;
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.1);
        }

        .textarea {
          grid-column: 1 / -1;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .form-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background: #d4af37;
          color: #1a2332;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #ffed4e;
          transform: translateY(-2px);
        }

        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background: transparent;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.1);
        }

        .comment {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .comment-author {
          color: #d4af37;
          font-weight: 600;
        }

        .comment-date {
          color: #888;
          font-size: 0.85rem;
        }

        .comment-text {
          color: #ddd;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .reply-btn {
          color: #d4af37;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .reply-btn:hover {
          text-decoration: underline;
        }

        .replies {
          margin-left: 2rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
        }

        .reply-badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          padding: 0.2rem 0.6rem;
          border-radius: 3px;
          font-size: 0.75rem;
          margin-left: 0.5rem;
          text-transform: uppercase;
        }

        .no-comments {
          text-align: center;
          color: #888;
          padding: 2rem;
        }
      `}</style>

      <h2 className="comments-title">💬 Comments ({comments.length})</h2>

      {/* COMMENT FORM */}
      <form className="comment-form" onSubmit={handleSubmitComment}>
        <div className="form-row">
          <input
            type="text"
            className="form-input"
            placeholder="Your username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-input"
            placeholder="Your email (private)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <textarea
          className="form-input textarea"
          placeholder={replyTo ? "Write a reply..." : "Share your thoughts..."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <div className="form-buttons">
          {replyTo && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setReplyTo(null)}
            >
              Cancel Reply
            </button>
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : replyTo ? 'Reply' : 'Comment'}
          </button>
        </div>
      </form>

      {/* COMMENTS LIST */}
      {comments.length === 0 ? (
        <div className="no-comments">No comments yet. Be the first to comment!</div>
      ) : (
        <div>
          {topLevelComments.map((comment) => (
            <div key={comment.id}>
              <div className="comment">
                <div className="comment-header">
                  <div>
                    <span className="comment-author">{comment.author_username}</span>
                  </div>
                  <span className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
                <button
                  className="reply-btn"
                  onClick={() => setReplyTo(comment.id)}
                >
                  Reply
                </button>
              </div>

              {/* REPLIES */}
              {getReplies(comment.id).length > 0 && (
                <div className="replies">
                  {getReplies(comment.id).map((reply) => (
                    <div key={reply.id} className="comment">
                      <div className="comment-header">
                        <div>
                          <span className="comment-author">{reply.author_username}</span>
                          <span className="reply-badge">Reply</span>
                        </div>
                        <span className="comment-date">{new Date(reply.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="comment-text">{reply.content}</p>
                      <button
                        className="reply-btn"
                        onClick={() => setReplyTo(comment.id)}
                      >
                        Reply
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    marginTop: '3rem'
  }
}
