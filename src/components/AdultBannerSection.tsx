import React, { useState } from 'react';
import { AdultBannerItem } from '../types';
import AgeVerifyModal from './AgeVerifyModal';

interface AdultBannerSectionProps {
  items: AdultBannerItem[];
}

const AdultBannerSection: React.FC<AdultBannerSectionProps> = ({ items }) => {
  const [verifyItem, setVerifyItem] = useState<AdultBannerItem | null>(null);

  if (!items || items.length === 0) return null;

  const handleConfirm = () => {
    if (verifyItem?.channelLink) {
      window.open(verifyItem.channelLink, '_blank');
    }
    setVerifyItem(null);
  };

  return (
    <>
      <div style={{ marginBottom: '28px' }}>
        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '12px',
        }}>
          <span style={{
            width: 3, height: 18,
            background: 'linear-gradient(180deg, #ec4899, #8b5cf6)',
            borderRadius: '2px',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(236,72,153,0.5)',
          }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px', fontWeight: 700,
            color: '#fff', letterSpacing: '-0.01em',
          }}>18+ Content</span>
        </div>

        {/* Horizontal scroll row */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => setVerifyItem(item)}
              style={{
                flexShrink: 0,
                position: 'relative',
                // YouTube 16:9 size
                width: '220px',
                height: '124px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#1a1a1d',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
                transform: 'translateZ(0)',
              }}
            >
              {/* Thumbnail */}
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transform: 'translateZ(0)',
                }}
              />

              {/* Dark overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* 18+ badge — top right */}
              <div style={{
                position: 'absolute', top: 8, right: 8,
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                borderRadius: '6px',
                padding: '3px 7px',
                zIndex: 10,
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', fontWeight: 900,
                  color: '#fff', letterSpacing: '0.05em',
                }}>18+</span>
              </div>

              {/* Title bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '8px 10px',
                zIndex: 10,
                pointerEvents: 'none',
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', fontWeight: 700,
                  color: '#fff',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                  marginBottom: '2px',
                }}>
                  {item.title}
                </p>
                {/* Watch button hint */}
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  ▶ Watch Now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Verify Modal */}
      <AgeVerifyModal
        isOpen={!!verifyItem}
        title={verifyItem?.title}
        onConfirm={handleConfirm}
        onExit={() => setVerifyItem(null)}
      />
    </>
  );
};

export default AdultBannerSection;
