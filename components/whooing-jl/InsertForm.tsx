'use client';
import styled from 'styled-components';
import useInput from '../../lib/hooks/useInput';
const InsertForm = () => {
  const date = useInput('');
  const item = useInput('');
  const amount = useInput('');
  const left = useInput('');
  const right = useInput('');
  const leftCategory = useInput('');
  const rightCategory = useInput('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      date: date.value,
      item: item.value,
      amount: amount.value,
      left: left.value,
      leftCategory: leftCategory.value,
      right: right.value,
      rightCategory: rightCategory.value,
    });
  };
  return (
    <Container>
      <div>InsertForm</div>
      <form onSubmit={onSubmit}>
        <div className='row paddin-bottom'>
          <div className='col-2'>
            <div className='form-group column'>
              <label htmlFor='date'>날짜</label>
              <input type='date' className='form-control' id='date' {...date} />
            </div>
          </div>
          <div className='col-1 paddin-left'>
            <div className='form-group column'>
              <label htmlFor='date'>아이템</label>
              <input type='text' className='form-control' id='item' {...item} />
            </div>
          </div>
          <div className='col-1 paddin-left'>
            <div className='form-group column'>
              <label htmlFor='date'>금액</label>
              <input
                type='text'
                className='form-control'
                id='amount'
                {...amount}
              />
            </div>
          </div>
          {/**
           * assets [ 자산 ]
           * liabilities [ 부채 ]
           * capital [ 순자산 ]
           * expenses [ 비용 ]
           * income [ 수익 ]
           */}
          <div className='col-1 paddin-left'>
            <div className='form-group column'>
              <label htmlFor='date'>왼쪽</label>
              <div className='row'>
                <select name='left-category' {...leftCategory}>
                  <option value='asset'>자산</option>
                  <option value='liabilities'>부채</option>
                  <option value='capital'>순자산</option>
                  <option value='expenses'>비용</option>
                </select>
                <input
                  type='text'
                  className='form-control'
                  id='left'
                  {...left}
                />
              </div>
            </div>
          </div>
          <div className='col-1 paddin-left'>
            <div className='form-group column'>
              <label htmlFor='date'>오른쪽</label>
              <div className='row'>
                <select name='right-category' {...rightCategory}>
                  <option value='asset'>자산</option>
                  <option value='liabilities'>부채</option>
                  <option value='capital'>순자산</option>
                  <option value='income'>수익</option>
                </select>
                <input
                  type='text'
                  className='form-control'
                  id='right'
                  {...right}
                />
              </div>
            </div>
          </div>
          <div className='paddin-left'>
            <div className='form-group column'>
              <button type='submit'>입력</button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};
export default InsertForm;
const Container = styled.section`
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 10px 24px;
  input {
    height: 38px;
    border-radius: 4px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .paddin-left {
    padding-left: 8px;
  }
  .padding-bottom {
    padding-bottom: 10px;
  }
  .col-3 {
    width: 30%;
  }
  .col-2 {
    width: 20%;
  }
  .col-1 {
    width: 15%;
  }
`;
