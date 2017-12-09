import React, { Component } from "react";
import { Button, Modal, Menu, Input, Icon, Layout } from "antd";
import { css } from "emotion";

import logic from "./logic";

const siderOverflowScroll = css`
  height: calc(80vh - 55px - 53px);
  & .ant-layout-sider-children {
    overflow-y: scroll;
  }
`;

class App extends Component {
  state = {
    showModal: false
  };
  setModalVisibility(showModal) {
    this.setState({ showModal });
  }
  render() {
    const { items, currentItem } = this.props;
    return (
      <div>
        <Button type="primary" onClick={() => this.setModalVisibility(true)}>
          Open ({this.props.items.length})
        </Button>
        <Modal
          title="Tabs!"
          style={{ height: "80vh" }}
          bodyStyle={{
            padding: 0,
            overflowY: "scroll",
            maxHeight: "calc(80vh - 55px - 53px)"
          }}
          width="60vw"
          visible={this.state.showModal}
          onCancel={() => this.setModalVisibility(false)}
          footer={
            <div>
              <Button type="primary" onClick={this.actions.addItem}>
                Add Item
              </Button>
            </div>
          }
        >
          <Layout>
            <Layout.Sider className={siderOverflowScroll}>
              <Menu
                onSelect={this.actions.onSelect}
                defaultSelectedKeys={["0"]}
              >
                {items.map((item, i) => (
                  <Menu.Item key={i}>
                    <Icon
                      onClick={() => this.actions.removeItem(i)}
                      type="close"
                    />
                    <span>{item}</span>
                  </Menu.Item>
                ))}
              </Menu>
            </Layout.Sider>
            <Layout.Content
              style={{
                overflowY: "scroll",
                maxHeight: "calc(80vh - 55px - 53px)"
              }}
            >
              <Input.TextArea
                autosize
                value={items[currentItem]}
                onChange={e => this.actions.onChange(currentItem, e)}
              />
            </Layout.Content>
          </Layout>
        </Modal>
      </div>
    );
  }
}

export default logic(App);
