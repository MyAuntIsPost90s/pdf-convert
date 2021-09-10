/**
 * 自定义业务异常，该异常一般用于提示用户，不做特殊处理
 *
 * @class BizException
 * @author cch
 */
class BizException {

    message;

    constructor(message) {
        this.message = message
    }
}

module.exports = BizException;