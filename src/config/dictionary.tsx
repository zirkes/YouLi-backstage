

export class Columns {
    selection: Object = {
        key: 'select',
        title: '全选',
        width: 50,
        dataKey: 'select',
        cellRenderer: (data) => {
            // console.log(data.rowIndex);
            return (<el-checkbox size="large" />)
        },
        headerCellRenderer: (data) => {
            return (<el-checkbox size="large" />)
        }
    }
}