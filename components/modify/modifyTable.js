import { Button, Card, Table, Popconfirm, Divider, Input, message, Select } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import fetcher from '../../utils/request'
const { Option } = Select;


const ModifyTableC = ({ dataSource, from, title = "" }) => {
	const [clickedCancel, setClickedCancel] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [cacheOriginData, setCacheOriginData] = useState({});
	const [data, setData] = useState(dataSource);

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
		const newData = data?.map((item) => ({ ...item }));

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
			score: ''
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
			if (!target[$config.columnsTitleKey] ) {
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
		target.state = 2;
		setData(newData)
		setLoading(true);
		saveNewData(target, type);
	}


	const columns = [
		{
			title: '创建时间',
			dataIndex: 'time',
			key: 'time',
			render: (text, record) => {
				text = Number(text)
				return moment(new Date(text)).format('YYYY-MM-DD')
			},
			align: 'center'
		},
		{
			title: $config.columnsTitle,
			dataIndex: $config.columnsTitleKey,
			width: '50%',
			key: $config.columnsTitleKey,
			align: 'center',
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
						<a onClick={(e) => toggleEditable(e, record._id)}>编辑</a>
						<Divider type="vertical" />
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

	
	return (
		<div >
			<Card title={title} bordered={false}>

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
