"use client";

import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  staffMembers,
  diamondMembers,
  platinumMembers,
  goldMembers,
  greenMembers,
  Instrumentalist,
} from "./teamMemberData";
import MemberCard from "./MemberCard";

type Member = {
  name: string;
  role: string;
  image: string;
};

const mapToMember = (member: { name: string; role: string; image: string }): Member => ({
  name: member.name,
  role: member.role,
  image: member.image,
});

export default function TeamMemberPage() {
  const [showAllStaff, setShowAllStaff] = useState(false);
  const [showAllDiamond, setShowAllDiamond] = useState(false);
  const [showAllPlatinum, setShowAllPlatinum] = useState(false);
  const [showAllGold, setShowAllGold] = useState(false);
  const [showAllGreen, setShowAllGreen] = useState(false);
  const [showAllInstrumentalist, setShowAllInstrumentalist] = useState(false);

  const displayedStaff = showAllStaff ? staffMembers : staffMembers.slice(0, 3);
  const displayedDiamond = showAllDiamond ? diamondMembers : diamondMembers.slice(0, 3);
  const displayedPlatinum = showAllPlatinum ? platinumMembers : platinumMembers.slice(0, 3);
  const displayedGold = showAllGold ? goldMembers : goldMembers.slice(0, 3);
  const displayedGreen = showAllGreen ? greenMembers : greenMembers.slice(0, 3);
  const displayedInstrumentalist = showAllInstrumentalist ? Instrumentalist : Instrumentalist.slice(0, 3);

  const renderSection = (
    title: string,
    members: Member[],
    showAll: boolean,
    toggleShowAll: () => void
  ) => (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 4, color: "#00A651" }}>
          {title}
        </Typography>
      </motion.div>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
        {members.map((member, index) => (
          <MemberCard key={index} member={mapToMember(member)} index={index} isMobile={false} isTablet={false} />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={toggleShowAll}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#00A651",
              color: "#00A651",
              "&:hover": { borderColor: "#007a3d", backgroundColor: "#00A651", color: "white" },
            }}
          >
            {showAll ? "See Less" : "See More"}
          </Button>
        </motion.div>
      </Box>
    </Container>
  );

  return (
    <>
      {/* Staff Section */}
      <Container maxWidth="lg" sx={{ py: 26 }}>
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 4, color: "#00A651" }}>
            Our Dedicated Staff
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
          {displayedStaff.map((member, index) => (
            <MemberCard key={index} member={mapToMember(member)} index={index} isMobile={false} isTablet={false} />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShowAllStaff(!showAllStaff)}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#00A651",
                color: "#00A651",
                "&:hover": { borderColor: "#007a3d", backgroundColor: "#00A651", color: "white" },
              }}
            >
              {showAllStaff ? "See Less" : "See More"}
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Other Sections */}
      {renderSection("Diamond Members", displayedDiamond, showAllDiamond, () =>
        setShowAllDiamond(!showAllDiamond)
      )}
      {renderSection("Platinum Members", displayedPlatinum, showAllPlatinum, () =>
        setShowAllPlatinum(!showAllPlatinum)
      )}
      {renderSection("Gold Members", displayedGold, showAllGold, () =>
        setShowAllGold(!showAllGold)
      )}
      {renderSection("Green Members", displayedGreen, showAllGreen, () =>
        setShowAllGreen(!showAllGreen)
      )}
      {renderSection("Instrumentalist", displayedInstrumentalist, showAllInstrumentalist, () =>
        setShowAllInstrumentalist(!showAllInstrumentalist)
      )}
    </>
  );
}
