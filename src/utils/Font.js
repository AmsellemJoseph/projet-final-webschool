import React, { useEffect } from 'react'
import WebFont from 'webfontloader';

const Font = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Press Start 2P','Audiowide','Happy Monkey']
      }
    });
  }, []);

  return (
    <div>

    </div>
  )
}

export default Font