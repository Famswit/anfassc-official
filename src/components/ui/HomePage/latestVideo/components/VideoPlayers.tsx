import { Button } from "@mui/material"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  selectedVideo: string
  setSelectedVideo: (video: string | null) => void
}

export default function VideoPlayer({ selectedVideo, setSelectedVideo }: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={() => setSelectedVideo(null)}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        style={{
          width: "80vw",        
          height: "80vh",      
          position: "relative",
          maxWidth: "1280px",  
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* YouTube iframe */}
        <iframe
          width="100%"
          height="100%"
          src={selectedVideo + "?autoplay=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "12px" }}
        />

        {/* Close Button */}
        <Button
          onClick={() => setSelectedVideo(null)}
          sx={{
            position: "absolute",
            top: -50,
            right: 0,
            color: "#fff",
            fontSize: "28px",
            minWidth: "auto",
            padding: "4px 8px",
          }}
        >
          ✕
        </Button>
      </motion.div>
    </motion.div>
  )
}
