import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Grid,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  useTheme,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../index.css';

export default function PlayerSetup({
  emojiCategories,
  nameInputs,
  setNameInputs,
  handleCategorySelect,
  saveNames,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategories, setSelectedCategories] = useState([null, null]);
  // New: Avatar upload
  const [avatars, setAvatars] = useState([null, null]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const isCategoryDisabled = (playerIndex, category) => {
    return selectedCategories[(playerIndex + 1) % 2] === category;
  };

  // Handle avatar upload
  const handleAvatarChange = (i, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        const updated = [...avatars];
        updated[i] = ev.target.result;
        setAvatars(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{
          background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
          p: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Blink Tac Toe
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '100%' }} className="space-y-6">
          <Grid container spacing={3}>
            {[0, 1].map(i => (
              <Grid item xs={12} sm={6} key={i}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={avatars[i]}
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: i === 0 ? '#8b5cf6' : '#3b82f6',
                            mr: 2
                          }}
                        >
                          {nameInputs[i]?.[0]?.toUpperCase() || i + 1}
                        </Avatar>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id={`avatar-upload-${i}`}
                          type="file"
                          onChange={e => handleAvatarChange(i, e)}
                        />
                        <label htmlFor={`avatar-upload-${i}`}>
                          <Tooltip title="Upload Avatar">
                            <IconButton component="span" size="small">
                              <PhotoCamera />
                            </IconButton>
                          </Tooltip>
                        </label>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            ml: 1,
                            color: i === 0 ? '#8b5cf6' : '#3b82f6',
                          }}
                        >
                          Player {i + 1}
                        </Typography>
                      </Box>

                      <TextField
                        fullWidth
                        label="Player Name"
                        placeholder={`Enter name for Player ${i + 1}`}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        sx={{ mb: 3 }}
                        value={nameInputs[i]}
                        onChange={e => {
                          const newNames = [...nameInputs];
                          newNames[i] = e.target.value;
                          setNameInputs(newNames);
                        }}
                        InputProps={{
                          sx: { borderRadius: 2, fontWeight: 600 }
                        }}
                      />

                      <Divider sx={{ mb: 2 }} />

                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1.5, fontWeight: 600, color: 'text.secondary' }}
                      >
                        Choose emoji category:
                      </Typography>

                      <Grid container spacing={1}>
                        {Object.entries(emojiCategories).map(([key, emojis]) => {
                          const isSelected = selectedCategories[i] === key;
                          const disabled = isCategoryDisabled(i, key);

                          return (
                            <Grid item xs={6} sm={12} key={key}>
                              <Button
                                variant={isSelected ? "contained" : "outlined"}
                                color={i === 0 ? "primary" : "secondary"}
                                disabled={disabled}
                                onClick={() => {
                                  handleCategorySelect(i, key);
                                  const updated = [...selectedCategories];
                                  updated[i] = key;
                                  setSelectedCategories(updated);
                                }}
                                fullWidth
                                sx={{
                                  borderRadius: 2,
                                  height: '100%',
                                  p: 1,
                                  fontWeight: 600,
                                  textTransform: 'none',
                                  backgroundColor: isSelected
                                    ? i === 0 ? 'primary.main' : 'secondary.main'
                                    : 'transparent',
                                  '&:hover': {
                                    backgroundColor: isSelected
                                      ? i === 0 ? 'primary.dark' : 'secondary.dark'
                                      : 'rgba(0,0,0,0.04)'
                                  },
                                  opacity: disabled ? 0.4 : 1
                                }}
                              >
                                <Box sx={{ textAlign: 'center', width: '100%' }}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ mb: 0.5, color: isSelected ? 'white' : 'inherit' }}
                                  >
                                    {key}
                                  </Typography>
                                  <Box sx={{ fontSize: '1.2rem', lineHeight: 1.5 }}>
                                    {emojis.slice(0, 3).join(' ')}
                                  </Box>
                                </Box>
                              </Button>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={saveNames}
              size="large"
              sx={{
                py: 2,
                borderRadius: 3,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
                },
              }}
            >
              Start Game
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
}