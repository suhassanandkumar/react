import React,{ Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { withStyles, Checkbox } from "@material-ui/core";

class TableDash extends Component {

  constructor(props){
    super(props)
    this.state = {
      order:"asc",
      orderBy:"calories",
      page:0,
      dense:true,
      rowsPerPage:5,
      selected :[]
    }
  }
     createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
      }
      
       rows = [
        this.createData('Cupcake', 305, 3.7, 67, 4.3),
        this.createData('Donut', 452, 25.0, 51, 4.9),
        this.createData('Eclair', 262, 16.0, 24, 6.0),
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        this.createData('Gingerbread', 356, 16.0, 49, 3.9),
        this.createData('Honeycomb', 408, 3.2, 87, 6.5),
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        this.createData('Jelly Bean', 375, 0.0, 94, 0.0),
        this.createData('KitKat', 518, 26.0, 65, 7.0),
        this.createData('Lollipop', 392, 0.2, 98, 0.0),
        this.createData('Marshmallow', 318, 0, 81, 2.0),
        this.createData('Nougat', 360, 19.0, 9, 37.0),
        this.createData('Oreo', 437, 18.0, 63, 4.0),
      ];
      
       descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
       getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => this.descendingComparator(a, b, orderBy)
          : (a, b) => -this.descendingComparator(a, b, orderBy);
      }
      
       stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
       headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
        { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
        { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
        { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
      ];

       handleRequestSort = (event, property) => {
         const {order, orderBy} = this.props;
        const isAsc = orderBy === property && order === "asc";
      
        this.setState({order:isAsc ? "desc" : "asc",orderBy:property})

       // setOrderBy(property);
      };
    
       handleSelectAllClick = event => {
        if (event.target.checked) {
          const newSelecteds = this.rows.map(n => n.name);
         // setSelected(newSelecteds);
         this.setState({selected:newSelecteds})
          return;
        }
       // setSelected([]);
       this.setState({selected:[]})
      };
    
       handleClick = (event, name) => {
         const {selected} = this.props;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        }
    
        //setSelected(newSelected);
        this.setState({selected:newSelected})
      };
    
       handleChangePage = (event, newPage) => {
       // setPage(newPage);
       this.setState({page: newPage})
      };
    
       handleChangeRowsPerPage = event => {
       // setRowsPerPage(parseInt(event.target.value, 10));
       this.setState({rowsPerPage: parseInt(event.target.value, 10)})
       this.setState({page: 0})
      };
    
       handleChangeDense = event => {
        //setDense(event.target.checked);
        this.setState({dense: event.target.checked})
      };
    
      

    render(){
        const {classes} = this.props;
        const {order,orderBy,selected,page,dense,rowsPerPage} = this.state;
        const isSelected = name => selected.indexOf(name) !== -1;
    
        const emptyRows =
         rowsPerPage - Math.min(rowsPerPage, this.rows.length - page * rowsPerPage);
        return (
<div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.rows.length}
            />
            <TableBody>
              {this.stableSort(this.rows, this.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
        );
    }
}

const useStyles = (theme) => ({
  root: {
    width: '100%',
  
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

export default withStyles(useStyles)(TableDash);