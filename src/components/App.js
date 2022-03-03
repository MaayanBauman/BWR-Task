import React, { useRef, useReducer, useState } from 'react';
import GridLayout from "react-grid-layout";
import { Component, LayoutItem, LayoutReducer } from "./layout";

import clsx from 'clsx';
import useStyles from './App.style';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const layoutItems = [];
const componentList = [
  { content: '1:1', h: 1, w: 1 },
  { content: '4:3', h: 4, w: 3 },
  { content: '2:3', h: 2, w: 3 },
  { content: '8:5', h: 8, w: 5 }
];

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const ref = useRef();
  const [layout, dispatch] = useReducer(LayoutReducer, layoutItems);
  const [open, setOpen] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Layout Screen
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          Components
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {
          componentList.map((component, index) =>
            <Component
              key={index}
              targetRef={ref}
              dispatch={dispatch}
              h={component.h}
              w={component.w}
              content={component.content}
            >
              <div className={classes.componentItem}>{component.content}</div>
            </Component>
          )
        }
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div><b>Drag and drop the items to the panel!</b></div>
        <div ref={ref} className={classes.gridLayout}>
          <GridLayout
            className="layout"
            layout={layout}
            onLayoutChange={layout => dispatch({ type: "changeLayout", layout })}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            {layout.map(item => (
              <LayoutItem
                key={"" + item.i}
                className={classes.layoutItem}
                {...item}
              >
                {item.content}
              </LayoutItem>
            ))}
          </GridLayout>
        </div>
      </main>
    </div>
  );
}
