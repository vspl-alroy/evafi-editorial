import * as React from "react"
import { useEffect, useState } from "react";

export type Toast = { kind: "success" | "error"; title: string; text: string }
const ToastView = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => {   
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    // Start animation immediately on mount
    const animationFrame = requestAnimationFrame(() => {
      setProgress(0)
    })
    return () => cancelAnimationFrame(animationFrame)
  }, [])
  return(
  <div className={`el-toast ${toast.kind}`} role="status">
    <div className="el-toast-icon">
      {toast.kind === "success" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10.25" stroke="#E6FEF3" strokeWidth="1.5" /><path d="M8 11.8125L10.8846 15.1875L17 9" stroke="#E6FEF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.14025 19.5163L11.1253 3.2576C11.5058 2.56918 12.4954 2.56918 12.8758 3.2576L21.8609 19.5163C22.2292 20.1828 21.7471 21 20.9857 21H3.01549C2.25399 21 1.77192 20.1828 2.14025 19.5163Z" stroke="#FFE5E6" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 9.95068V14.4898" stroke="#FFE5E6" strokeWidth="1.5" strokeLinecap="round" /><rect x="11.3262" y="17.1265" width="1.34965" height="1.34966" rx="0.674827" fill="#FFE5E6" stroke="#FFE5E6" /></svg>
      )}
    </div>
    <div className="el-toast-body">
      <div className="el-toast-head">
        <p>{toast.title}</p>
        <button type="button" onClick={onClose} aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.6006 13.6001L8.00059 8.0001L13.6006 2.4001" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" /><path d="M2.40039 2.3999L8.00039 7.9999L2.40039 13.5999" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" /></svg>
        </button>
      </div>
      <p className="el-toast-text">{toast.text}</p>
    </div>
    <div
        className="el-toast-progress"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          width: "100%",
          backgroundColor: toast.kind === "success" ? "#059956" : "#ee2d33",
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left center",
          transition: "transform 5000ms linear",
        }}
      />
  </div>
)}

export default ToastView;