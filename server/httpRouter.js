import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import qs from 'querystring'
import logger from './logger.js'
import mysqlManager from './mysqlManager.js'

let router = express.Router()

router.get('/api/getData', function (req, res, next) {
  let url_parts = url.parse(req.url, true)
  // let name = url_parts.query.name
  // logger.info('getData:' + name)
  logger.info('getData')

  let data = {
    trendData: [
      {weekidx: '201701', '1': 300, '2': 100},
      {weekidx: '201702', '1': 50, '2': 300},
      {weekidx: '201703', '1': 100, '2': 200},
      {weekidx: '201704', '1': 200, '2': 100},
      {weekidx: '201705', '1': 150, '2': 110},
      {weekidx: '201706', '1': 300, '2': 180},
      {weekidx: '201707', '1': 170, '2': 190},
      {weekidx: '201708', '1': 155, '2': 210},
      {weekidx: '201709', '1': 250, '2': 280},
      {weekidx: '201710', '1': 250, '2': 220},
      {weekidx: '201711', '1': 190, '2': 270},
      {weekidx: '201712', '1': 180, '2': 310},
      {weekidx: '201713', '1': 170, '2': 320},
      {weekidx: '201714', '1': 250, '2': 420},
      {weekidx: '201715', '1': 230, '2': 440},
      {weekidx: '201716', '1': 290, '2': 220},
      {weekidx: '201717', '1': 350, '2': 320},
      {weekidx: '201718', '1': 450, '2': 410},
      {weekidx: '201719', '1': 250, '2': 430},
      {weekidx: '201720', '1': 150, '2': 400}
    ],
    detail: [
      {
        key: '1',
        data: [
          [
            {date: '2017/05/22', title: 'テスト１', author: '田中', like: '22', url: 'www.google.com'},
            {date: '2017/04/11', title: 'テスト２', author: '高橋', like: '1', url: 'www.google.com'},
            {date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'},
            {date: '2017/06/01', title: 'テスト４', author: '本田', like: '0', url: 'www.google.com'},
            {date: '2017/04/21', title: 'テスト５', author: '鎌田', like: '25', url: 'www.google.com'},
            {date: '2017/05/22', title: 'テスト６', author: '倉山', like: '112', url: 'www.google.com'},
            {date: '2017/04/08', title: 'テスト７', author: '弥生', like: '27', url: 'www.google.com'},
            {date: '2017/03/25', title: 'テスト８', author: '田中', like: '99', url: 'www.google.com'},
            {date: '2017/02/17', title: 'テスト９', author: '渡辺', like: '45', url: 'www.google.com'},
            {date: '2017/03/29', title: 'テスト１０', author: '倉山', like: '27', url: 'www.google.com'},
            {date: '2017/02/22', title: 'テスト１１', author: '田中', like: '33', url: 'www.google.com'},
            {date: '2017/05/18', title: 'テスト１２', author: '高橋', like: '166', url: 'www.google.com'},
            {date: '2017/03/29', title: 'テスト１３', author: '本田', like: '24', url: 'www.google.com'}
          ],
          [{date: '2017/05/22', title: 'テスト１', author: '田中', like: '22', url: 'www.google.com'}],
          [{date: '2017/04/11', title: 'テスト２', author: '高橋', like: '1', url: 'www.google.com'},
          {date: '2017/04/11', title: 'テスト２', author: '高橋', like: '1', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}],
          [],
          [{date: '2017/05/07', title: 'テスト３', author: '渡辺', like: '31', url: 'www.google.com'}]
        ]
      },
      {
        key: '2',
        data: [
          [
            {date: '2017/01/17', title: 'テスト２１', author: '田中', like: '122', url: 'www.google.com'},
            {date: '2017/02/11', title: 'テスト２２', author: '高橋', like: '11', url: 'www.google.com'},
            {date: '2017/03/03', title: 'テスト２３', author: '渡辺', like: '131', url: 'www.google.com'},
            {date: '2017/03/02', title: 'テスト２４', author: '本田', like: '10', url: 'www.google.com'},
            {date: '2017/02/25', title: 'テスト２５', author: '鎌田', like: '125', url: 'www.google.com'},
            {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
            {date: '2017/01/15', title: 'テスト２７', author: '弥生', like: '127', url: 'www.google.com'},
            {date: '2017/03/29', title: 'テスト２８', author: '田中', like: '199', url: 'www.google.com'},
            {date: '2017/02/19', title: 'テスト２９', author: '渡辺', like: '145', url: 'www.google.com'},
            {date: '2017/01/13', title: 'テスト３０', author: '倉山', like: '127', url: 'www.google.com'},
            {date: '2017/02/27', title: 'テスト３１', author: '田中', like: '133', url: 'www.google.com'},
            {date: '2017/03/17', title: 'テスト３２', author: '高橋', like: '266', url: 'www.google.com'},
            {date: '2017/01/13', title: 'テスト３３', author: '本田', like: '124', url: 'www.google.com'}
          ],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'},
          {date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}],
          [],
          [{date: '2017/01/22', title: 'テスト２６', author: '倉山', like: '212', url: 'www.google.com'}]
        ]
      }
    ]
  }

  // format must to be {error: null/code, data: null/data}.
  res.json({error: null, data: data})
})

module.exports = router
