import React from 'react';
import { Box, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import { CheckCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Twitch, Discord } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip'

const ChannelCard = ({ userProps, marginTop }) => (
  <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
      marginTop,
    }}
  >
    
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
      <Link to={`/user/${userProps?.uniqueName}`} style={{display: 'flex', justifyContent: 'center'}}>
        <CardMedia
          image={userProps?.profilePic || ''}
          alt={userProps?.name}
          sx={{ borderRadius: '10%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
        />
      </Link>
      <Link to={`/user/${userProps?.uniqueName}`}>
        <Typography variant="h6">
          {userProps?.name}{'  '}
          <CheckCircle sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>
      </Link>
      <Stack direction="row" className='justify-content-center mt-2' spacing={3}>
        { userProps?.discord && 
          <Link 
            to={`https://discordapp.com/users/${userProps?.discord}`} target='_blank'
            data-tooltip-id={"discordTooltip"}
            data-tooltip-content={userProps?.discord}
            data-tooltip-place="bottom"
          >
            <Discord />
          </Link>
        }
        { userProps?.twitter && 
          <Link 
            to={`https://twitter.com/${userProps?.twitter}`} target='_blank'
            data-tooltip-id={"twitterTooltip"}
            data-tooltip-content={userProps?.twitter}
            data-tooltip-place="bottom"
          >
            <Twitter />
          </Link>
        }
        { userProps?.twitch && 
          <Link 
            to={`https://www.twitch.tv/${userProps?.twitch}`} target='_blank'
            data-tooltip-id={"twitchTooltip"}
            data-tooltip-content={userProps?.twitch}
            data-tooltip-place="bottom"
          >
            <Twitch />
          </Link>
        }
        { userProps?.youtube && 
          <Link 
            to={`https://www.youtube.com/@${userProps?.youtube}`} target='_blank'
            data-tooltip-id={"youtubeTooltip"}
            data-tooltip-content={userProps?.youtube}
            data-tooltip-place="bottom"
          >
            <Youtube />
          </Link>
        }
      </Stack>
      <Tooltip 
          key={"discordTooltip"}
          id={"discordTooltip"} 
      />
      <Tooltip 
          key={"twitterTooltip"}
          id={"twitterTooltip"} 
      />
      <Tooltip 
          key={"twitchTooltip"}
          id={"twitchTooltip"} 
      />
      <Tooltip 
          key={"youtubeTooltip"}
          id={"youtubeTooltip"} 
      />
    </CardContent>
    
  </Box>
);

export default ChannelCard;