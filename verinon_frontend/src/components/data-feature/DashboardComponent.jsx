import React from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { Input } from 'reactstrap'
import '../../style/Dashboard.css'
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import InputIcon from '@material-ui/icons/Input';
import BookIcon from '@material-ui/icons/Book';
import DashboardService from "../../apis/DashboardService"
import { Bar, Line, Pie } from 'react-chartjs-2';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    InputIcon: forwardRef((props, ref) => <InputIcon {...props} ref={ref} />),
    BookIcon: forwardRef((props, ref) => <BookIcon className="home-car-book-icon" {...props} ref={ref} />)
};

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pieData: {},
            lineData: {},
            barData: {},
            filter1: '',
            filter2: '',
            chartData: [],
            isLoaded: false
        }
        this.retrieveData = this.retrieveData.bind(this)
        this.barData = this.barData.bind(this)
        this.pieData = this.pieData.bind(this)
        this.lineData = this.lineData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        this.retrieveData()
    }

    retrieveData() {
        DashboardService.getData()
            .then(
                response => {
                    this.setState({ data: response.data, isLoaded: true })
                    this.filter()
                }
            )
    }

    pieData() {
        this.setState(
            {
                pieData: {
                    labels: ['Male', 'Female', 'Non Binary'],
                    datasets: [
                        {
                            label: 'Male, Female, Non Binary',
                            backgroundColor: [
                                '#B21F00',
                                '#C9DE00',
                                '#2FDE00'
                            ],
                            hoverBackgroundColor: [
                                '#501800',
                                '#4B5000',
                                '#175000'
                            ],
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: [this.state.chartData.male, this.state.chartData.female, this.state.chartData.nonbinary]
                        }
                    ]
                }
            }
        )
    }

    lineData() {
        this.setState(
            {
                lineData: {
                    labels: ['Agender', 'Bigender', 'Genderfluid', 'Genderqueer'],
                    datasets: [
                        {
                            label: 'Others',
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: [this.state.chartData.agender, this.state.chartData.bigender, this.state.chartData.genderfluid, this.state.chartData.genderqueer]
                        }
                    ]
                }
            }
        )
    }

    barData() {
        this.setState(
            {
                barData: {
                    labels: ['Agender', 'Bigender', 'Female',
                        'Genderfluid', 'Genderqueer', 'Male', 'Non Binary', 'Polygender'],
                    datasets: [
                        {
                            label: 'All',
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: [this.state.chartData.agender, this.state.chartData.bigender, this.state.chartData.female, this.state.chartData.genderfluid, this.state.chartData.genderqueer, this.state.chartData.male, this.state.chartData.nonbinary, this.state.chartData.polygender]
                        }
                    ]
                }
            }
        )
    }

    filter() {
        DashboardService.filter({ filter1: this.state.filter1, filter2: this.state.filter2 })
            .then(
                response => {
                    this.setState({
                        data: response.data
                    })
                    this.countChartsData(response.data)
                }
            ).catch(error => {
            })
    }

    countChartsData() {
        DashboardService.countChartData({ data: this.state.data })
            .then(
                response => {
                    this.setState({
                        chartData: response.data
                    })
                    this.barData()
                    this.pieData()
                    this.lineData()
                }
            ).catch(error => {
            })
    }

    handleFilter1Change = event => {
        this.setState({
            filter1: event.target.value
        });
    }

    handleFilter2Change = event => {
        this.setState({
            filter2: event.target.value
        });
    }

    render() {
        return (

            <div>
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li>
                            <Input onChange={this.handleFilter1Change} placeholder="Filter 1" />
                        </li>
                        <li>
                            <Input onChange={this.handleFilter2Change} placeholder="Filter 2" />
                        </li>
                        <li>
                            <Button onClick={() => this.filter()}>Apply Filter</Button>
                        </li>
                    </ul>
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <Row>
                            <Col className="charts">
                                <div className="charts-wrapper">
                                    <Pie
                                        data={this.state.pieData}
                                        options={{
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: 'Male v Female v Non Binary',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col className="charts">
                                <div className="charts-wrapper">
                                    <Bar
                                        data={this.state.barData}
                                        options={{
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>

                            </Col>
                            <Col className="charts">
                                <div className="charts-wrapper">
                                    <Line
                                        data={this.state.lineData}
                                        options={{
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>

                            </Col>

                        </Row>
                        <Row>
                            <div className="col-lg-12">
                                <MaterialTable
                                    columns={[
                                        { title: 'ID', field: 'id' },
                                        { title: 'Email', field: 'email' },
                                        { title: 'First Name', field: 'first_name' },
                                        { title: 'Last Name', field: 'last_name' },
                                        { title: 'Gender', field: 'gender' },
                                        { title: 'IP Address', field: 'ip_address' }
                                    ]}
                                    data={this.state.data}
                                    title="Employee Data"
                                    icons={tableIcons}
                                    options={{
                                        search: false,
                                        padding: "dense"
                                    }}
                                />
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardComponent;