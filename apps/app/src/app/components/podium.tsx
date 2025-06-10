import { Box, Typography } from "@mui/material";

type Place = 1 | 2 | 3;

interface Winner {
  place: Place;
  name: string;
  prize: string;
}

interface PodiumProps {
  winners: Winner[];
}

const colors: Record<Place, string> = {
  1: '#FFD93D',  // gold
  2: '#C0C0C0',  // silver
  3: '#CD7F32'   // bronze
};

const heights: Record<Place, number> = {
  1: 110,
  2: 80,
  3: 65
};

const Podium = ({ winners }: PodiumProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Podio
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 2,
          height: 130
        }}
      >
        {winners
          .sort((a, b) => a.place - b.place)
          .map((winner) => (
            <Box
              key={winner.place}
              sx={{
                width: 90,
                height: heights[winner.place],
                backgroundColor: colors[winner.place],
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                p: 1.5,
                textAlign: 'center',
                transition: '0.3s',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {winner.name}
              </Typography>
              <Typography variant="caption">{winner.prize}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Podium;
