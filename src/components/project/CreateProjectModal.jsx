import React, { useState } from "react";
import CloseOn from "../../assets/icons/Close/CloseOn";
import Input from "../common/Input";
import Button from "../common/Button";
import { checkInviteEmail, registerProject } from "apis/projectApi";

const CreateProjectModal = ({
  setNewProjectCreateModalOpen,
  newProjectCreateModalOpen,
  setSidebarOpen,
  onProjectCreated,
}) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberEmailList, setMemberEmailList] = useState([]);
  const [onSuccess, setOnSuccess] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [githubOrgName, setGithubOrgName] = useState("");
  const [repoInput, setRepoInput] = useState("");
  const [orgRepos, setOrgRepos] = useState([]);
  const [repoErrMessage, setRepoErrMessage] = useState("");

  // 이메일 형식 검증
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 이메일 유효성 검사
  const handleIsUserEmail = async (email) => {
    if (!validateEmail(email)) {
      setOnSuccess(false);
      setErrMessage("유효하지 않은 이메일 형식입니다.");
      return;
    }
    try {
      await checkInviteEmail(email);
      setOnSuccess(true);
      setErrMessage("");
    } catch (e) {
      setOnSuccess(false);
      setErrMessage(e.response?.data?.message || "이메일 확인 실패");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 요청바디
    const payload = {
      projectName,
      description,
      invitedEmails: memberEmailList,
      githubInfos:
        githubOrgName.trim() && orgRepos.length > 0
          ? [{ githubOrgName: githubOrgName.trim(), orgRepos }]
          : [],
    };

    try {
      await registerProject(payload);
      alert("프로젝트가 생성되었습니다.");

      setNewProjectCreateModalOpen(false);
      setSidebarOpen(false);
      onProjectCreated?.();
    } catch (error) {
      console.log("프로젝트 생성 실패:", error);
      alert("프로젝트 생성에 실패했습니다.");
    }
  };

  // 레포지토리 추가 핸들러
  const handleAddRepo = () => {
    const trimmed = repoInput.trim();
    if (!trimmed) return;

    if (orgRepos.includes(trimmed)) {
      setRepoErrMessage("이미 추가된 레포입니다.");
      return;
    }

    setRepoErrMessage("");
    setOrgRepos([...orgRepos, trimmed]);
    setRepoInput("");
  };

  return (
    <div className="w-[550px] overflow-auto h-[620px] flex flex-col py-14 items-center relative bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200">
      {/* 닫기 버튼 */}
      <div
        className="w-8 h-8 absolute right-[20px] top-[20px] cursor-pointer"
        onClick={() => setNewProjectCreateModalOpen(!newProjectCreateModalOpen)}
      >
        <CloseOn />
      </div>
      {/* 프로젝트 생성 폼 */}
      <form
        className="w-[450px] h-[400px] flex flex-col justify-between items-center gap-7"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col justify-center items-start gap-3">
          {/* 프로젝트 이름 */}
          <Input
            type="text"
            title="프로젝트 이름"
            placeholder="프로젝트 이름을 입력해주세요."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {/* 프로젝트 설명 */}
          <Input
            type="text"
            title="프로젝트 설명"
            placeholder="프로젝트에 대한 설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* 깃허브 조직명 */}
          <Input
            type="text"
            title="GitHub 조직명"
            placeholder="예: DoctalkOrg"
            value={githubOrgName}
            onChange={(e) => setGithubOrgName(e.target.value)}
            required={false}
          />
          <Input
            type="text"
            title="레포 추가"
            placeholder="예: frontend"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            required={false}
            useButton={true}
            onClick={handleAddRepo}
            onSuccess={repoErrMessage ? false : null}
            errmsg={repoErrMessage}
          />

          {orgRepos.length > 0 && (
            <div className="w-full flex flex-col justify-start items-start gap-2 font-[Palanquin]">
              <div className="text-gray-800 text-base font-semibold">
                연동할 레포 목록
              </div>
              <ul className="w-full max-h-24 list-disc pl-1 overflow-y-auto">
                {orgRepos.map((repo) => (
                  <li
                    key={repo}
                    className="text-gray-700 w-full h-6 flex justify-between"
                  >
                    {repo}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setOrgRepos(orgRepos.filter((r) => r !== repo))
                      }
                    >
                      <CloseOn />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 멤버 이메일 */}
          <Input
            type="text"
            title="멤버"
            placeholder="프로젝트 멤버의 이메일을 입력해주세요."
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            onBlur={() => handleIsUserEmail(memberEmail)}
            required={false}
            useButton={true}
            onSuccess={onSuccess}
            onClick={() => {
              if (onSuccess === true) {
                if (memberEmailList.includes(memberEmail)) {
                  setErrMessage("이미 초대목록에 추가된 이메일입니다.");
                  setOnSuccess(false);
                  return;
                }
                setErrMessage("");
                setMemberEmailList([...memberEmailList, memberEmail]);
                setOnSuccess(null); // 상태 초기화
                setMemberEmail(""); // 입력창 초기화
              }
            }}
            errmsg={errMessage}
          />
          {/* 멤버 이메일 리스트 */}
          {memberEmailList.length > 0 && (
            <div className="w-full flex flex-col justify-start items-start gap-2 font-[Palanquin]">
              <div className="text-gray-800 text-base font-semibold">
                초대할 멤버 목록
              </div>
              <ul className="w-full max-h-24 list-disc pl-1 overflow-y-auto">
                {memberEmailList.map((email, index) => (
                  <li
                    key={index}
                    className="text-gray-700 w-full h-6 flex justify-between"
                  >
                    {email}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setMemberEmailList(
                          memberEmailList.filter((e) => e !== email),
                        )
                      }
                    >
                      <CloseOn />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 제출 버튼 */}
        <div className="w-full h-14">
          <Button
            type="submit"
            text="프로젝트 만들기"
            width="100%"
            height="100%"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProjectModal;
