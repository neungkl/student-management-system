import React from 'react'
import { Link } from 'react-router'

import {
  convertObjectToQueryParams
} from '../../../utils/query'

const advisorHeader = [
  {
    title: 'Info',
    prop: 'student_id',
    isAddable: false,
    isEditable: false,
    formatter: (data) => (
      <Link to={'/student-info/' + data}className='btn btn-info btn-sm' data-attach-on-delete>Info</Link>
    )
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: false,
    isAddable: true
  },
  {
    title: 'ชื่อจริง',
    prop: 'firstname',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'นามสกุล',
    prop: 'lastname',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'ชื่อโครงการ',
    prop: 'project_name',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คำอธิบายโครงการ',
    prop: 'project_description',
    isEditable: false,
    isNullable: true,
    isAddable: false
  }
]

export default {
  table: {
    name: 'Project Advisees',
    showAddButton: false,
    showFilterButton: true,
    filterOptions: (filterStr) => {
      const url = '../api/advisor/advisees?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: advisorHeader,
  pagination: {
    pageSize: 10,
    paginationBarSize: 20
  },
  src: {
    url: '../api/advisor/project/advisees',
    parser: (raw) => raw.data
  }
}
