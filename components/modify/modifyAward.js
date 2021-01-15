import { Button, Card, Table, Popconfirm, Divider, Input, message, Select, DatePicker} from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import fetcher from '../../utils/request'
const { Option } = Select;
const { RangePicker } = DatePicker;


const ModifyTableC = ({ dataSource, from, total}) => {
	const [clickedCancel, setClickedCancel] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [cacheOriginData, setCacheOriginData] = useState({});
	const [data, setData] = useState(dataSource);
	const [newTotal, setTotal] = useState(total);
    
    

	let $config = {};

	switch (from) {
		case '1':
			$config = {
				saveUrl: '/api/list/saveListProject',
				updateUrl: '/api/list/updateListProject',
				delUrl: '/api/list/delListProject',
				columnsTitle: '项目名',
				columnsTitleKey: 'title'
			}
			break
		case '2':
			$config = {
				saveUrl: '/api/list/saveListProjectDesc',
				updateUrl: '/api/list/updateListProjectDesc',
				delUrl: '/api/list/delListProjectDesc',
				columnsTitle: '描述',
				columnsTitleKey: 'title'
			}
			break
		case '3':
			$config = {
				saveUrl: '/api/list/saveListScore',
				updateUrl: '/api/list/updateListScore',
				delUrl: '/api/list/delListScore',
				columnsTitle: '分数',
				columnsTitleKey: 'num'
			}
			break
		case '4':
			$config = {
				saveUrl: '/api/list/saveAwardList',
				updateUrl: '/api/list/updateAwardList',
				delUrl: '/api/list/delAwardList',
				exchangeAwardUrl: '/api/list/exchangeAward',
				columnsTitle: '奖品',
				columnsTitleKey: 'title'
			}
			break
	}

	const stateConfig = [
		{
			state: 1,
			label: '可兑换'
		},
		{
			state: 2,
			label: '已兑换'
		},
		{
			state: 3,
			label: '已过期'
		},
	]

	

	const getRowByKey = (key, newData) => (newData || data)?.filter((item) => item._id === key)[0];

	//编辑事件
	const toggleEditable = (e, key) => {
		e.preventDefault();
		// const newData = data?.map((item) => ({ ...item }));
		const newData = JSON.parse(JSON.stringify(data));
		const target = getRowByKey(key, newData);
		if (target) {
			// 进入编辑状态时保存原始数据
			if (!target.editable) {
				cacheOriginData[key] = { ...target };
				setCacheOriginData(cacheOriginData);
			}
			
			target.editable = !target.editable;
			setData(newData);
		}
	};

	//增加新项目按钮事件
	const addNewMember = () => {
		const newData = data?.map((item) => ({ ...item })) || [];
		let add = {
			[$config.columnsTitleKey]: '',
			time: + new Date(),
			editable: true,
			isNew: true,
			_id: + new Date(),
            score: '',
            date: [],
			dates: [],
			startDate: '',
			endDate: '',
            // hackValue: undefined
		}
		if(from == 4) {
			add.state = 1
		}
		newData.push(add)
		setIndex(index + 1);
		setData(newData);
	}

	//输入框的change事件
	const handleFieldChange = (e, fieldName, key) => {
		let value = '';
		if(fieldName == 'state' ) {
			value = e.value;
		}else {
			value = e.target.value
		}
		

		if(fieldName == 'score' && /[^0-9]/g.test(value)) {
			return false
		}
		const newData = [...data];
		const target = getRowByKey(key, newData);

		if (target) {
			target[fieldName] = value;
			setData(newData);
		}
	};

	const handleKeyPress = (e, key, type) => {
		if (e.key === 'Enter' && from != 4) {
			saveRow(e, key, type);
		}
	};

	//保存或添加
	const saveRow = (e, key, type) => {
		e.persist();
		setLoading(true);

		setTimeout(() => {
			if (clickedCancel) {
				setClickedCancel(false);
				return;
			}

			const target = getRowByKey(key) || {};
			if (!target[$config.columnsTitleKey] || (from == 4  && (!target.state || !target.score || !target.startDate || !target.endDate))) {
				message.error('请填写完整信息。');
				// e.target.focus();
				setLoading(false);
				return;
			}

			

			delete target.isNew;
			toggleEditable(e, key);


			saveNewData(target, type)


			
		}, 500);
	};
	//存入后台
	const saveNewData = async (data, type) => {
		
		let result;
		try {
			if (type == 1) {

				result = await fetcher(
					$config.saveUrl,
					{
						method: 'POST',
						body: JSON.stringify(data)
					}
				)
			} else {
				result = await fetcher(
					$config.updateUrl,
					{
						method: 'POST',
						body: JSON.stringify(data)
					}
				)
			}
			await getListData()
			message.success('操作成功')


		} catch {
			message.error('操作失败')
		}
		setLoading(false);

	}


	//删除
	const remove = async (key, type) => {
		const sData = [...data];
		const target = getRowByKey(key, sData);
		const newData = data?.filter((item) => item._id !== key);

		setData(newData);

		try {
			if (type == 2) {
				const result = await fetcher(
					$config.delUrl,
					{
						method: 'POST',
						body: JSON.stringify(target)
					}
				)
			}
			message.success('删除成功')
		} catch {
			message.error('删除失败')
		}

	};

	const cancel = (e, key) => {
		setClickedCancel(true);
		e.preventDefault();
		const newData = [...data]; // 编辑前的原始数据

		let cacheData = [];
		cacheData = newData.map((item) => {
			if (item._id === key) {
				if (cacheOriginData[key]) {
					const originItem = { ...item, ...cacheOriginData[key], editable: false };
					delete cacheOriginData[key];
					setCacheOriginData(cacheOriginData);
					return originItem;
				}
			}

			return item;
		});
		setData(cacheData);
		setClickedCancel(false);
	};

	//兑换
	const handleExchange = (e, key, type) => {
		const newData = [...data];
		const target = getRowByKey(key, newData);
		// target.state = 2;
		// setData(newData)
		setLoading(true);
		exchangeFn(target, type);
	}
	
	const exchangeFn = async (data, type) => {
		let param = {_id: data._id}
		let result;
		try {
			result = await fetcher(
				$config.exchangeAwardUrl,
				{
					method: 'POST',
					body: JSON.stringify(param)
				}
			)
			
			if(result.code == 0) {
				
				await getTotalData()
				message.success('操作成功')
			}else {
				message.warn(result.message)
			}

		} catch {
			message.error('操作失败')
		}
		setLoading(false);

	}
	
	
	const getListData = async (data) => {
		const result = await fetcher(
			'/api/list/getAwardList',
		)
		setData(result.data || []);
	}

	const getTotalData = async () => {
		let result = await fetcher(
			'/api/list/getPunchCardScore'
		)
		let total = result.data.length ? result.data[0].total : 0;
		setTotal(total)

	}
    const onCalendarChange = (e, key, type) => {
        const newData = [...data];
		const target = getRowByKey(key, newData);
		let len = e.length;
		
        if(type == 1) {
            if (target) {
                target.dates = e;
                setData(newData);
            }
        }else {
            if (target) {
				target.date = e;
				if(e && len) {
					let start = +new Date(e[0]);
					let end = +new Date(e[1]);
					if(e[0]) {
						target.startDate = start;
					}
					if(e[1]) {
						target.endDate = end;
					}
				}
                setData(newData);
            }
        }
        
    }
    const onOpenChange = (e,key) => {
        const newData = [...data];
		const target = getRowByKey(key, newData);
        if (open) {
            // setHackValue([]);
            // setDates([]);
            if (target) {
                target.dates = [];
                setData(newData);
            }
          } else {
            // setHackValue(undefined);
          }
    }
    // const disabledDate = (current,key) => {
    //     const newData = [...data];
    //     const target = getRowByKey(key, newData);
    //     let dates = target.dates;
    //     if (!dates || dates.length === 0) {
    //       return false;
    //     }
    //     // const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    //     // const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    //     // return tooEarly || tooLate;
    //     let newDate = +new Date();

    //     return newDate > +new Date(current)
        

    //   };


	const columns = [
		// {
		// 	title: '创建时间',
		// 	dataIndex: 'time',
		// 	key: 'time',
		// 	render: (text, record) => {
		// 		text = Number(text)
		// 		return moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')
		// 	},
		// 	align: 'center'
		// },
		{
			title: $config.columnsTitle,
			dataIndex: $config.columnsTitleKey,
			key: $config.columnsTitleKey,
			align: 'center',
			width: '30%',
			render: (text, record) => {
				if (record.editable) {
					let type = record.isNew ? 1 : 2;
					return (
						<Input
							value={text}
							onChange={(e) => handleFieldChange(e, $config.columnsTitleKey, record._id)}
							onKeyPress={(e) => handleKeyPress(e, record._id, type)}
							placeholder="请输入内容"
						/>
					);
				}

				return text;
			}
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (text, record) => {
				if (!!record.editable && loading) {
					return null;
				}

				if (record.editable) {
					if (record.isNew) {
						return (
							<span>
								<a onClick={(e) => saveRow(e, record._id, 1)}>添加</a>
								<Divider type="vertical" />
								<Popconfirm title="是否要删除此行？" onConfirm={() => remove(record._id, 1)}>
									<a>删除</a>
								</Popconfirm>
								
							</span>
						);
					}

					return (
						<span>
							<a onClick={(e) => saveRow(e, record._id, 2)}>保存</a>
							<Divider type="vertical" />
							<a onClick={(e) => cancel(e, record._id)}>取消</a>
						</span>
					);
				}

				return (
					<span>
						
                        {from == 4 && record.state == 1 ? (
							<>
							<a onClick={(e) => handleExchange(e,record._id, 2)}>兑换</a>
                            <Divider type="vertical" />
							</>
						) : (
							<></>
						)}
						<Popconfirm
							title="是否要删除此行？"
							onConfirm={() => remove(record._id, 2)}
						>
							<a>删除</a>
						</Popconfirm>

						
					
						
					</span>
				);
			}
		}
	]

	if(from == 4) {
		let row2 = {
			title: '状态',
			dataIndex: 'state',
			key: 'state',
			align: 'center',
			render: (text, record) => {
				text = Number(text)
				// if (record.editable) {
				// 	let type = record.isNew ? 1 : 2;
				// 	return (
				// 		// <Input
				// 		// 	value={text}
				// 		// 	onChange={(e) => handleFieldChange(e, 'state', record._id)}
				// 		// 	onKeyPress={(e) => handleKeyPress(e, record._id, type)}
				// 		// 	placeholder="请输入内容"
				// 		// />
				// 		<Select
				// 			placeholder="请选择"
				// 			onChange={(e) => handleFieldChange(e, 'state', record._id)}
				// 			labelInValue
				// 			style={{ width: 120 }}
				// 			defaultValue={{ value: text || 1 }}
				// 			>
				// 			{stateConfig.map(item => (
				// 				<Option key={record._id + item.state} value={item.state}>{item.label}</Option>
				// 			))}
            	// 		</Select>
				// 	);
				// }

				let curState = stateConfig.filter((item) => {
					return text == item.state
				})

				return curState[0].label;
			}
		}
		let row1 = {
			title: '兑换积分',
			dataIndex:'score',
			key:'score',
			align: 'center',
			width: '10%',
			render: (text, record) => {
				if (record.editable) {
					let type = record.isNew ? 1 : 2;
					return (
						<Input
							value={text}
							onChange={(e) => handleFieldChange(e,'score', record._id)}
							onKeyPress={(e) => handleKeyPress(e, record._id, type)}
							placeholder="请输入内容"
						/>
					);
				}

				return text;
			}
        }
        let row3 = {
			title: '有效期',
			dataIndex:'startDate',
			key:'startDate',
			align: 'center',
			width: '30%',
			render: (text, record) => {
				if (record.editable) {
					return (
                        <RangePicker
                            onCalendarChange={val => onCalendarChange(val, record._id, 1)}
                            onChange={val => onCalendarChange(val, record._id, 2)}
							onOpenChange={val => onOpenChange(val, record._id)}
							format="YYYY-MM-DD HH:mm:ss"
							showTime
                        />
					);
				}
				
				let f = 'YYYY-MM-DD HH:mm:ss';
				if(text) {
					return moment(new Date(text)).format(f) + ' ~ ' + moment(new Date(record.endDate)).format(f)
				}

				return '-';
			}
		}

        
		columns.splice(1,0,row1,row2,row3 )
	}
	return (
		<div >
			<Card title={'奖品列表-------总分：'+newTotal} bordered={false}>

				<Table
					loading={loading}
					columns={columns}
					dataSource={data}
					pagination={false}
					rowClassName={(record) => (record.editable ? 'input_editable' : '')}
					rowKey={columns => columns.time}
					size="middle"
				/>
				<Button
					style={{
						width: '100%',
						marginTop: 16,
						marginBottom: 8,
					}}
					type="dashed"
					onClick={addNewMember}
				>
					<PlusOutlined />新增成员
        </Button>
			</Card>
		</div>
	);
};

export default ModifyTableC;
