import React, { Component } from 'react'
import Promise from 'bluebird'
import './TableFrame.scss'

class TableFrame extends Component {

  log (msg) {
    if (typeof this.props.showLog === 'function') {
      this.props.showLog(msg)
    }
  }

  render () {
    const props = this.props
    let { header, data } = props

    if (!(header instanceof Array)) throw new Error('Header is incorrect')
    data = data || []

    let thead = header.map((header, i) => {
      return <th key={i}>{header.title}</th>
    })
    let tbody = data.map((rowData, i) => {
      let rowbody = header.map((header, j) => {
        if (header.isDelete) {
          let delBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>)

          const onDelete = () => {
            const confirmDeleteRow = props.confirmDeleteRow || ((resolve) => resolve())
            header.onDelete = header.onDelete || ((resolve) => resolve())
            new Promise(confirmDeleteRow)
              .then(
                () => {
                  this.log('Deleting...')
                  return new Promise((resolve, reject) => header.onDelete(resolve, reject, rowData))
                },
                () => Promise.reject('cancel')
              )
              .then(
                () => {
                  this.props.deleteRowFunc(rowData._rid)
                  this.log('')
                },
                (reason) => {
                  this.log('')
                  typeof this.props.onError === 'function'
                    ? this.props.onError(reason === 'cancel' ? '' : reason)
                    : null
                }
              )
          }

          delBtn = React.cloneElement(
            delBtn,
            {
              onClick: delBtn.props['data-attach-on-delete'] ? onDelete : null
            }
          )

          return <td key={j}>{delBtn}</td>
        } else if (header.isEdit) {
          let updateBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-warning btn-sm'>Edit</div>)

          updateBtn = React.cloneElement(
            updateBtn,
            {
              onClick: () => {
                const confirmEditRow = props.confirmEditRow || ((resolve, reject, data) => resolve(data))
                header.onUpdate = header.onUpdate || ((resolve, reject, data) => resolve(data))

                new Promise(
                  (resolve, reject) => confirmEditRow(resolve, reject, JSON.parse(JSON.stringify(rowData)))
                ).then(
                    (newData) => {
                      this.log('Editing...')
                      return new Promise(
                        (resolve, reject) => header.onUpdate(resolve, reject, newData)
                      )
                    },
                    () => Promise.reject('cancel')
                  )
                  .then(
                    (newData) => {
                      this.props.updateRowFunc(rowData._rid, newData)
                      this.log('')
                    },
                    (reason) => {
                      this.log('')
                      typeof this.props.onError === 'function'
                        ? this.props.onError(reason === 'cancel' ? '' : reason)
                        : null
                    }
                  )
              }
            }
          )
          return <td key={j}>{updateBtn}</td>
        } else {
          let val = rowData[header.prop]
          if (typeof header.formatter === 'function') {
            val = header.formatter(val, i, rowData)
          }
          return <td key={j}>{val}</td>
        }
      })
      return <tr key={i}>{rowbody}</tr>
    })

    const colSpanSize = header.length

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {thead}
          </tr>
        </thead>
        <tbody>
          {
            props.isLoading
            ? (
              <tr><td style={{ textAlign: 'center' }} colSpan={colSpanSize}>
                <i className='fa fa-spin fa-spinner' /> Loading...
              </td></tr>
            ) : (
              data.length === 0
              ? (
                <tr><td style={{ textAlign: 'center' }} colSpan={colSpanSize}>
                  No record to show
                </td></tr>
              )
              : tbody
            )
          }
        </tbody>
      </table>
    )
  }
}

TableFrame.propTypes = {
  className: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  header: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired,

  deleteRowFunc: React.PropTypes.func,
  updateRowFunc: React.PropTypes.func,
  confirmDeleteRow: React.PropTypes.func,
  confirmEditRow: React.PropTypes.func,
  onError: React.PropTypes.func,
  showLog: React.PropTypes.func
}

export default TableFrame
