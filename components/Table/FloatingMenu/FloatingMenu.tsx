import { ReactNode, useState } from 'react';
import Menu from '@mui/material/Menu';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';

interface IFloatingMenu {
    children: ReactNode,
    achorContent: ReactNode
}

export default function FloatingMenu({children, achorContent} : IFloatingMenu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        aria-controls={Boolean(anchorEl) ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {achorContent}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Menu>
    </div>
  );
}