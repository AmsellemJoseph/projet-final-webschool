import React, { useEffect } from 'react'
import WebFont from 'webfontloader';

const Font = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Press Start 2P','Audiowide']
      }
    });
  }, []);

  return (
    <div>

    </div>
  )
}

export default Font