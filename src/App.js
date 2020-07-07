import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {apiInstance} from "./index";

const accessId = "p-16daopsmc51f"; // String | Access ID
const opts = {
};

const listItemsOpts = {
    'type': ['static-secret', 'dynamic-secret'], // String | The item types list of the requested items. In case it is empty, all types of items will be returned. options- [key, static-secret, dynamic-secret]
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
      apiInstance.auth(accessId, opts, (error, data, response) => {
          if (error) {
              console.error(error);
              setLoading(false);
          } else {
              setToken(data.token);
              apiInstance.listItems(data.token, listItemsOpts, (error, data, response) => {
                  if (error) {
                      console.error(error);
                      setLoading(false);
                  } else {
                      setLoading(false);
                      setItems(data?.response?.items);
                  }
              });
          }
      });
  }, []);

  return (
    <div className="App">
        {loading &&
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>}
        <main>
            <ol className="gradient-list">
                {items.map(item => <Secret key={item.item_name} secret={item} token={token}/>)}
            </ol>
        </main>
    </div>
  );
};

export default App;

const Secret = ({secret, token}) => {
    const [value, setValue] = useState('');
    const [dynamicValue, setDynamicValue] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const fetchSecretValue = () => {
        setLoading(true);
        apiInstance.getSecretValue(secret.item_name, token, (error, data, response) => {
            if (error) {
                console.error(error);
                setLoading(false);
            } else {
                setValue(data?.response[0]);
                setLoading(false);
            }
        });
    };

    const fetchDynamicSecretValue = () => {
        setLoading(true);
        apiInstance.getDynamicSecretValue(secret.item_name, token, (error, data, response) => {
            if (error) {
                setLoading(false);
                console.error(error);
            } else {
                setLoading(false);
                setDynamicValue(data.response);
            }
        });
    };

    const renderStaticButton = () => {
      if (value) {
          return <span><strong>Value: </strong>{value}</span>
      }

      return <button className={`btn-grad ${!loading && 'btn-grad_static'}`} onClick={fetchSecretValue}>get secret value</button>
    };

    const renderDynamicButton = () => {
        if (dynamicValue) {
            return <div>
                <div style={{marginBottom: 10}}>
                    <strong>User: </strong><span>{dynamicValue.user}</span>
                </div>
                <div><strong>Password: </strong><span>{dynamicValue.password}</span></div>
            </div>
        }

        return <button className={`btn-grad ${!loading && 'btn-grad_dynamic'}`} onClick={fetchDynamicSecretValue}>get dynamic secret</button>
    };

    return (
        <li>
            <span>
                <strong>Name:</strong> {secret.item_name.substring(1)}
            </span>
            {
                secret.item_type === 'DYNAMIC_SECRET'
                    ? renderDynamicButton()
                    : renderStaticButton()
            }
        </li>
    )
};
