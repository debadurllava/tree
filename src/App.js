import React from "react";
import "./styles.css";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableHead,
  TableRow,
  Tooltip,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import OpenIcon from "@material-ui/icons/OpenInNew";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    overflow: "auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row: {
    minHeight: 0
  }
}));

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const headers = [{ key: "task" }, { key: "person" }, { key: "date" }];

const taskTree = new TreeNode("Task Tree");
taskTree.children.push(
  new TreeNode({
    task: "Make Breakfast",
    person: "Alice",
    date: "2/06/2020",
    id: 1
  })
);
taskTree.children.push(
  new TreeNode({ task: "Clean house", person: "Bob", date: "6/06/2020", id: 2 })
);
taskTree.children[0].children.push(
  new TreeNode({ task: "Buy Bacon", person: "Alice", date: "1/06/2020", id: 3 })
);
taskTree.children[0].children.push(
  new TreeNode({ task: "Buy Eggs", person: "Alice", date: "1/06/2020", id: 4 })
);
taskTree.children[1].children.push(
  new TreeNode({
    task: "Clean Windows",
    person: "Bob",
    date: "4/06/2020",
    id: 5
  })
);
taskTree.children[1].children.push(
  new TreeNode({
    task: "Hoover Floor",
    person: "Bob",
    date: "5/06/2020",
    id: 6
  })
);
taskTree.children[1].children[0].children.push(
  new TreeNode({
    task: "Buy new sponge",
    person: "Alice",
    date: "3/06/2020",
    id: 7
  })
);

export default function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({});
  console.log(state);
  console.log(state["parentTasks"]);
  if (state["parentTasks"] === undefined) {
    const newstate = { ...state, parentTasks: true };
    setState(newstate);
  }
  const handleClick = item => {
    newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  function treeTable(taskTree, collapseId) {
    return taskTree.children.map(task => (
      <React.Fragment>
        <TableRow hover key={task.value.id}>
          {headers.map(({ key, format = value => value }) => (
            <TableCell style={{ padding: 0 }}>
              <Collapse
                key={collapseId}
                in={state[collapseId]}
                timeout="auto"
                unmountOnExit
              >
                {format(task.value[key])}
              </Collapse>
            </TableCell>
          ))}
          <TableCell style={{ padding: 0 }}>
            <Collapse
              key={collapseId}
              // component="table"
              in={state[collapseId]}
              timeout="auto"
              unmountOnExit
            >
              {task.children.length > 0 ? (
                <Button
                  key={task.value.id}
                  onClick={() => handleClick(task.value.id)}
                >
                  {state[task.value.id] ? <ExpandLess /> : <ExpandMore />}
                </Button>
              ) : null}
            </Collapse>
          </TableCell>
        </TableRow>
        {treeTable(task, task.value.id)}
      </React.Fragment>
    ));
  }

  console.log(taskTree);
  return (
    <Paper classtask={classes.container}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map(({ key }) => (
              <TableCell key={key}>
                <div classtask={classes.header}>{key}</div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{treeTable(taskTree, "parentTasks")}</TableBody>
      </Table>
    </Paper>
  );
}
