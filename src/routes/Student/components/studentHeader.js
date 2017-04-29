import React from 'react'

import { requestAndResponse, removeNull } from '../../../utils/query'

const studentHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data) => {
      requestAndResponse(
        '../api/student/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_id: data.student_id,
            data: removeNull(data)
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Delete',
    prop: 'delete',
    isDelete: true,
    formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
    onDelete: (resolve, reject, data) => {
      requestAndResponse(
        '../api/student/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            where: {
              student_id: data.student_id
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: false
  },
  {
    title: 'CurID',
    prop: 'curriculum_id',
    isEditable: false,
    isNullable: false
  },
  {
    title: 'MemID',
    prop: 'member_id',
    isEditable: false
    // validate: (resolve, reject, data) => {
    //   setTimeout(() => resolve('eiei'), 500)
    // }
  },
  {
    title: 'คำนำหน้าชื่อ',
    prop: 'title',
    isNullable: false
  },
  {
    title: 'ชื่อ',
    prop: 'firstname',
    isNullable: false
  },
  {
    title: 'นามสกุล',
    prop: 'lastname',
    isNullable: false
  },
  {
    title: 'อีเมล์',
    prop: 'email'
  },
  {
    title: 'สัญชาติ',
    prop: 'nationality'
  },
  {
    title: 'วันเกิด',
    prop: 'birthdate',
    formatter: (date) => {
      if (date) return date.slice(0, 10)
      return null
    },
    formatBeforeEdit: (date) => {
      if (date) return date.slice(0, 10)
      return null
    }
  },
  {
    title: 'เพศ',
    prop: 'gender',
    isNullable: false
    // TODO: option F M
  },
  {
    title: 'รหัสประชาชน',
    prop: 'citizen_id',
    isNullable: false
  },
  {
    title: 'ศาสนา',
    prop: 'religion'
  },
  {
    title: 'มือถือ',
    prop: 'mobile'
  },
  {
    title: 'Img',
    prop: 'img'
  },
  {
    title: 'ที่อยู่',
    prop: 'addr'
  },
  {
    title: 'รหัสไปรษณีย์',
    prop: 'zipcode'
  },
  {
    title: 'ประเทศ',
    prop: 'country'
  },
  {
    title: 'เบอร์โทรฉุกเฉิน',
    prop: 'emer_name'
  },
  {
    title: 'เบอร์โทรศัพท์ฉุกเฉิน',
    prop: 'emer_mobile'
  },
  {
    title: 'ที่อยู่ฉุกเฉิน',
    prop: 'emer_addr'
  },
  {
    title: 'รหัสไปรษณีย์ฉุกเฉิน',
    prop: 'emer_zipcode'
  },
  {
    title: 'ประเทศฉุกเฉิน',
    prop: 'emer_country'
  },
  {
    title: 'โรงเรียนมัธยม',
    prop: 'highschool_name'
  },
  {
    title: 'เกรดมัธยม',
    prop: 'highschool_grade'
  },
  {
    title: 'GPAX',
    prop: 'gpax'
  },
  {
    title: 'จำนวนเทอม',
    prop: 'semester_count',
    isNullable: false
  },
  {
    title: 'SummerCount',
    prop: 'summer_count',
    isNullable: false
  },
  {
    title: 'สถานะ',
    prop: 'status',
    isNullable: false
  },
  {
    title: 'คะแนนความประพฤติ',
    prop: 'behavioral_score',
    isNullable: false
  }
]

export default {
  table: {
    add: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/student/insert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(newData)
          })
        },
        resolve,
        reject
      )
    }
  },
  header: studentHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/student/all',
    parser: (raw) => raw.data
  }
}

